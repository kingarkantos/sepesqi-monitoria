// ===========================
// SEPESQI Volunteer Reservation App
// ===========================

(function () {
    'use strict';

    // ---- State ----
    let currentDay = 'seg-22';
    let reservations = {};
    let db = null;
    let dbRef = null;
    let isConnected = false;
    let currentSlotId = null;

    // ---- DOM References ----
    const mainContent = document.getElementById('mainContent');
    const dayNav = document.getElementById('dayNav');
    const modalOverlay = document.getElementById('modalOverlay');
    const cancelModalOverlay = document.getElementById('cancelModalOverlay');
    const volunteerNameInput = document.getElementById('volunteerName');
    const cancelNameInput = document.getElementById('cancelName');
    const modalInfo = document.getElementById('modalInfo');
    const modalTitle = document.getElementById('modalTitle');
    const cancelModalText = document.getElementById('cancelModalText');
    const toastContainer = document.getElementById('toastContainer');
    const connectionStatus = document.getElementById('connectionStatus');
    const totalReservedEl = document.getElementById('totalReserved');
    const totalAvailableEl = document.getElementById('totalAvailable');

    // ---- Firebase Init ----
    function initFirebase() {
        if (typeof firebaseConfig === 'undefined' || firebaseConfig.apiKey === 'YOUR_API_KEY') {
            showConfigWarning();
            return;
        }

        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            dbRef = db.ref('reservations');

            // Connection state
            db.ref('.info/connected').on('value', (snap) => {
                isConnected = snap.val() === true;
                updateConnectionStatus();
            });

            // Listen for real-time updates
            dbRef.on('value', (snapshot) => {
                reservations = snapshot.val() || {};
                renderCurrentDay();
                updateStats();
            });

            setConnectionStatus('connected', 'Conectado em tempo real');
        } catch (err) {
            console.error('Firebase init error:', err);
            setConnectionStatus('disconnected', 'Erro de conexão');
            showToast('error', '❌', 'Erro ao conectar ao banco de dados');
        }
    }

    function showConfigWarning() {
        mainContent.innerHTML = `
            <div class="config-warning">
                <span class="warning-emoji">⚠️</span>
                <h2>Firebase não configurado</h2>
                <p>Para usar o sistema de reservas, configure o arquivo <code>config.js</code> com as credenciais do seu projeto Firebase.</p>
                <p>Consulte as instruções no arquivo <code>config.js</code>.</p>
            </div>
        `;
        setConnectionStatus('disconnected', 'Não configurado');
    }

    // ---- Connection Status ----
    function setConnectionStatus(status, text) {
        connectionStatus.className = `connection-status ${status}`;
        connectionStatus.querySelector('.status-text').textContent = text;
    }

    function updateConnectionStatus() {
        if (isConnected) {
            setConnectionStatus('connected', 'Conectado em tempo real');
        } else {
            setConnectionStatus('disconnected', 'Desconectado');
        }
    }

    // ---- Stats ----
    function updateStats() {
        let totalSlots = 0;
        let reserved = 0;

        Object.values(SLOT_DATA).forEach(day => {
            Object.values(day.shifts).forEach(shift => {
                shift.categories.forEach(cat => {
                    cat.slots.forEach(slot => {
                        totalSlots++;
                        if (reservations[slot.id]) {
                            reserved++;
                        }
                    });
                });
            });
        });

        animateCounter(totalReservedEl, reserved);
        animateCounter(totalAvailableEl, totalSlots - reserved);
    }

    function animateCounter(el, target) {
        const current = parseInt(el.textContent) || 0;
        if (current === target) return;

        const diff = target - current;
        const steps = Math.min(Math.abs(diff), 10);
        const stepValue = diff / steps;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            el.textContent = Math.round(current + stepValue * step);
            if (step >= steps) {
                el.textContent = target;
                clearInterval(interval);
            }
        }, 40);
    }

    // ---- Day Navigation ----
    dayNav.addEventListener('click', (e) => {
        const tab = e.target.closest('.day-tab');
        if (!tab) return;

        const day = tab.dataset.day;
        if (day === currentDay) return;

        currentDay = day;

        // Update active tab
        document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        renderCurrentDay();
    });

    // ---- Rendering ----
    function renderCurrentDay() {
        const dayData = SLOT_DATA[currentDay];
        if (!dayData) return;

        let html = `
            <div class="day-content">
                <h2 class="day-title">
                    <span class="title-emoji">${dayData.emoji}</span>
                    ${dayData.label}
                </h2>
        `;

        // Render each shift
        for (const [shiftKey, shift] of Object.entries(dayData.shifts)) {
            const shiftClass = shiftKey === 'morning' ? 'morning' : 'night';

            // Count slots in this shift
            let shiftTotal = 0;
            let shiftReserved = 0;
            shift.categories.forEach(cat => {
                cat.slots.forEach(slot => {
                    shiftTotal++;
                    if (reservations[slot.id]) shiftReserved++;
                });
            });

            html += `
                <div class="shift-section">
                    <div class="shift-header ${shiftClass}">
                        <span class="shift-emoji">${shift.emoji}</span>
                        <span class="shift-title">${shift.label}</span>
                        <span class="shift-badge">${shiftReserved}/${shiftTotal} vagas</span>
                    </div>
            `;

            // Render each category
            shift.categories.forEach(cat => {
                const catTotal = cat.slots.length;
                const catReserved = cat.slots.filter(s => reservations[s.id]).length;
                const progress = catTotal > 0 ? (catReserved / catTotal) * 100 : 0;

                html += `
                    <div class="category-card">
                        <div class="category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                            <div class="category-icon ${cat.iconClass}">
                                ${cat.emoji}
                            </div>
                            <div class="category-info">
                                <div class="category-name">${cat.name}</div>
                                <div class="category-count">${catReserved} de ${catTotal} vagas preenchidas</div>
                            </div>
                            <div class="category-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progress}%"></div>
                                </div>
                                <span class="progress-text">${catReserved}/${catTotal}</span>
                            </div>
                        </div>
                        <div class="slot-list">
                `;

                cat.slots.forEach(slot => {
                    const reservation = reservations[slot.id];
                    const isReserved = !!reservation;
                    const statusClass = isReserved ? 'reserved' : 'available';

                    html += `
                        <div class="slot-item ${statusClass}" data-slot-id="${slot.id}">
                            <div class="slot-indicator"></div>
                            <div class="slot-details">
                                <div class="slot-room">${slot.room}</div>
                                <div class="slot-status">
                                    ${isReserved
                                        ? `<span class="slot-volunteer-name">${escapeHtml(reservation.name)}</span>`
                                        : 'Vaga disponível'}
                                </div>
                            </div>
                            <button class="slot-action" data-slot-id="${slot.id}" data-room="${escapeHtml(slot.room)}" data-category="${escapeHtml(cat.name)}">
                                ${isReserved ? 'Cancelar' : 'Reservar'}
                            </button>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
        }

        html += `</div>`;
        mainContent.innerHTML = html;

        // Attach event listeners
        mainContent.querySelectorAll('.slot-action').forEach(btn => {
            btn.addEventListener('click', handleSlotAction);
        });
    }

    // ---- Slot Actions ----
    function handleSlotAction(e) {
        e.stopPropagation();
        const slotId = e.target.dataset.slotId;
        const room = e.target.dataset.room;
        const category = e.target.dataset.category;

        if (!slotId) return;

        const reservation = reservations[slotId];

        if (reservation) {
            // Show cancel modal
            openCancelModal(slotId, room, category, reservation.name);
        } else {
            // Show reservation modal
            openReservationModal(slotId, room, category);
        }
    }

    // ---- Reservation Modal ----
    function openReservationModal(slotId, room, category) {
        currentSlotId = slotId;
        modalTitle.textContent = 'Reservar Vaga';
        modalInfo.innerHTML = `
            <strong>Categoria:</strong> ${category}<br>
            <strong>Local:</strong> ${room}
        `;
        volunteerNameInput.value = '';
        modalOverlay.classList.add('active');
        setTimeout(() => volunteerNameInput.focus(), 300);
    }

    function closeReservationModal() {
        modalOverlay.classList.remove('active');
        currentSlotId = null;
    }

    async function confirmReservation() {
        const name = volunteerNameInput.value.trim();
        if (!name) {
            volunteerNameInput.style.borderColor = 'var(--danger)';
            volunteerNameInput.focus();
            showToast('error', '⚠️', 'Por favor, digite seu nome');
            return;
        }

        if (name.length < 3) {
            showToast('error', '⚠️', 'Nome muito curto. Use pelo menos 3 caracteres.');
            return;
        }

        if (!currentSlotId || !dbRef) return;

        const btnConfirm = document.getElementById('btnConfirm');
        const btnText = btnConfirm.querySelector('.btn-text');
        const btnLoader = btnConfirm.querySelector('.btn-loader');
        btnConfirm.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';

        try {
            // Check if slot is still available (transaction)
            const snapshot = await dbRef.child(currentSlotId).once('value');
            if (snapshot.val()) {
                showToast('error', '😔', 'Esta vaga já foi reservada por outra pessoa!');
                closeReservationModal();
                return;
            }

            await dbRef.child(currentSlotId).set({
                name: name,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });

            showToast('success', '✅', `Reserva confirmada para ${name}!`);
            closeReservationModal();
        } catch (err) {
            console.error('Reservation error:', err);
            showToast('error', '❌', 'Erro ao fazer reserva. Tente novamente.');
        } finally {
            btnConfirm.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    // ---- Cancel Modal ----
    function openCancelModal(slotId, room, category, name) {
        currentSlotId = slotId;
        cancelModalText.innerHTML = `
            Tem certeza que deseja cancelar a reserva de <strong>${escapeHtml(name)}</strong>?<br>
            <small style="color: var(--text-muted);">${category} — ${room}</small>
        `;
        cancelNameInput.value = '';
        cancelModalOverlay.classList.add('active');
        setTimeout(() => cancelNameInput.focus(), 300);
    }

    function closeCancelModal() {
        cancelModalOverlay.classList.remove('active');
        currentSlotId = null;
    }

    async function confirmCancellation() {
        const typedName = cancelNameInput.value.trim();
        if (!typedName) {
            cancelNameInput.style.borderColor = 'var(--danger)';
            cancelNameInput.focus();
            showToast('error', '⚠️', 'Digite o nome para confirmar o cancelamento');
            return;
        }

        if (!currentSlotId || !dbRef) return;

        // Verify name matches
        const reservation = reservations[currentSlotId];
        if (!reservation) {
            showToast('error', '❌', 'Esta reserva já foi cancelada');
            closeCancelModal();
            return;
        }

        if (typedName.toLowerCase() !== reservation.name.toLowerCase()) {
            showToast('error', '⚠️', 'O nome não confere com a reserva');
            cancelNameInput.style.borderColor = 'var(--danger)';
            return;
        }

        const btnConfirm = document.getElementById('cancelBtnConfirm');
        const btnText = btnConfirm.querySelector('.btn-text');
        const btnLoader = btnConfirm.querySelector('.btn-loader');
        btnConfirm.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';

        try {
            await dbRef.child(currentSlotId).remove();
            showToast('success', '🗑️', 'Reserva cancelada com sucesso');
            closeCancelModal();
        } catch (err) {
            console.error('Cancel error:', err);
            showToast('error', '❌', 'Erro ao cancelar. Tente novamente.');
        } finally {
            btnConfirm.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    // ---- Modal Events ----
    document.getElementById('modalClose').addEventListener('click', closeReservationModal);
    document.getElementById('btnCancel').addEventListener('click', closeReservationModal);
    document.getElementById('btnConfirm').addEventListener('click', confirmReservation);

    document.getElementById('cancelModalClose').addEventListener('click', closeCancelModal);
    document.getElementById('cancelBtnBack').addEventListener('click', closeCancelModal);
    document.getElementById('cancelBtnConfirm').addEventListener('click', confirmCancellation);

    // Close modals on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeReservationModal();
    });
    cancelModalOverlay.addEventListener('click', (e) => {
        if (e.target === cancelModalOverlay) closeCancelModal();
    });

    // Enter key to confirm
    volunteerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') confirmReservation();
        // Reset border color on input
        volunteerNameInput.style.borderColor = '';
    });
    cancelNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') confirmCancellation();
        cancelNameInput.style.borderColor = '';
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalOverlay.classList.contains('active')) closeReservationModal();
            if (cancelModalOverlay.classList.contains('active')) closeCancelModal();
        }
    });

    // ---- Toast Notifications ----
    function showToast(type, emoji, message) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-emoji">${emoji}</span>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 4200);
    }

    // ---- Utilities ----
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ---- Excel Export ----
    function exportToExcel() {
        if (typeof XLSX === 'undefined') {
            showToast('error', '❌', 'Biblioteca de exportação não carregou. Recarregue a página.');
            return;
        }

        const wb = XLSX.utils.book_new();

        // Create a summary sheet with all data
        const summaryRows = [];
        summaryRows.push(['SEPESQI Martha Falcão – Monitoria 2026']);
        summaryRows.push(['Relatório de Reservas de Voluntários']);
        summaryRows.push([`Exportado em: ${new Date().toLocaleString('pt-BR')}`]);
        summaryRows.push([]);

        Object.entries(SLOT_DATA).forEach(([dayKey, dayData]) => {
            summaryRows.push([dayData.label]);
            summaryRows.push(['Turno', 'Categoria', 'Local/Função', 'Voluntário', 'Status']);

            Object.entries(dayData.shifts).forEach(([shiftKey, shift]) => {
                shift.categories.forEach(cat => {
                    cat.slots.forEach(slot => {
                        const reservation = reservations[slot.id];
                        summaryRows.push([
                            shift.label,
                            cat.name,
                            slot.room,
                            reservation ? reservation.name : '',
                            reservation ? '✅ Reservado' : '⬜ Disponível'
                        ]);
                    });
                });
            });

            summaryRows.push([]);
        });

        const summaryWs = XLSX.utils.aoa_to_sheet(summaryRows);

        // Set column widths
        summaryWs['!cols'] = [
            { wch: 14 },  // Turno
            { wch: 30 },  // Categoria
            { wch: 28 },  // Local
            { wch: 30 },  // Voluntário
            { wch: 16 },  // Status
        ];

        // Merge title cells
        summaryWs['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
            { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
            { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } },
        ];

        XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumo Geral');

        // Create individual sheets for each day
        Object.entries(SLOT_DATA).forEach(([dayKey, dayData]) => {
            const rows = [];
            rows.push(['Turno', 'Categoria', 'Local/Função', 'Voluntário', 'Status']);

            Object.entries(dayData.shifts).forEach(([shiftKey, shift]) => {
                shift.categories.forEach(cat => {
                    cat.slots.forEach(slot => {
                        const reservation = reservations[slot.id];
                        rows.push([
                            shift.label,
                            cat.name,
                            slot.room,
                            reservation ? reservation.name : '',
                            reservation ? 'Reservado' : 'Disponível'
                        ]);
                    });
                });
            });

            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [
                { wch: 14 },
                { wch: 30 },
                { wch: 28 },
                { wch: 30 },
                { wch: 16 },
            ];

            // Sheet name from day label (max 31 chars for Excel)
            const sheetName = dayData.label.substring(0, 31);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });

        // Generate and download
        const fileName = `SEPESQI_Monitoria_${new Date().toISOString().slice(0, 10)}.xlsx`;
        XLSX.writeFile(wb, fileName);
        showToast('success', '📥', `Arquivo ${fileName} baixado com sucesso!`);
    }

    // Export button event
    document.getElementById('btnExport').addEventListener('click', exportToExcel);

    // ---- Init ----
    function init() {
        // Show loading first
        mainContent.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <div class="loading-text">Carregando vagas...</div>
            </div>
        `;

        initFirebase();
    }

    init();
})();
