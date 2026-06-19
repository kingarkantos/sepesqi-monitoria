// ===========================
// Data Model – SEPESQI Monitoria
// ===========================
// All volunteer slot definitions for each day, shift, and category

const SLOT_DATA = {
    "seg-22": {
        label: "Segunda-feira – 22/06",
        emoji: "📅",
        shifts: {
            morning: {
                label: "Manhã",
                emoji: "🌅",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "seg-22-m-cred-209", room: "Sala 209" },
                            { id: "seg-22-m-cred-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "seg-22-m-apoio-209", room: "Sala 209" },
                            { id: "seg-22-m-apoio-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "seg-22-m-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "seg-22-m-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "seg-22-m-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            },
            night: {
                label: "Noite",
                emoji: "🌙",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "seg-22-n-cred-209", room: "Sala 209" },
                            { id: "seg-22-n-cred-208", room: "Sala 208" },
                            { id: "seg-22-n-cred-207", room: "Sala 207" },
                            { id: "seg-22-n-cred-206", room: "Sala 206" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "seg-22-n-apoio-209", room: "Sala 209" },
                            { id: "seg-22-n-apoio-208", room: "Sala 208" },
                            { id: "seg-22-n-apoio-207", room: "Sala 207" },
                            { id: "seg-22-n-apoio-206", room: "Sala 206" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "seg-22-n-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "seg-22-n-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "seg-22-n-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            }
        }
    },

    "ter-23": {
        label: "Terça-feira – 23/06",
        emoji: "📅",
        shifts: {
            morning: {
                label: "Manhã",
                emoji: "🌅",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "ter-23-m-cred-209", room: "Sala 209" },
                            { id: "ter-23-m-cred-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "ter-23-m-apoio-209", room: "Sala 209" },
                            { id: "ter-23-m-apoio-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "ter-23-m-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "ter-23-m-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "ter-23-m-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            },
            night: {
                label: "Noite",
                emoji: "🌙",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "ter-23-n-cred-209", room: "Sala 209" },
                            { id: "ter-23-n-cred-208", room: "Sala 208" },
                            { id: "ter-23-n-cred-207", room: "Sala 207" },
                            { id: "ter-23-n-cred-206", room: "Sala 206" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "ter-23-n-apoio-209", room: "Sala 209" },
                            { id: "ter-23-n-apoio-208", room: "Sala 208" },
                            { id: "ter-23-n-apoio-207", room: "Sala 207" },
                            { id: "ter-23-n-apoio-206", room: "Sala 206" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "ter-23-n-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "ter-23-n-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "ter-23-n-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            }
        }
    },

    "qui-25": {
        label: "Quinta-feira – 25/06",
        emoji: "📅",
        shifts: {
            morning: {
                label: "Manhã",
                emoji: "🌅",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "qui-25-m-cred-209", room: "Sala 209" },
                            { id: "qui-25-m-cred-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "qui-25-m-apoio-209", room: "Sala 209" },
                            { id: "qui-25-m-apoio-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "qui-25-m-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "qui-25-m-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "qui-25-m-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            },
            night: {
                label: "Noite",
                emoji: "🌙",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "qui-25-n-cred-209", room: "Sala 209" },
                            { id: "qui-25-n-cred-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "qui-25-n-apoio-209", room: "Sala 209" },
                            { id: "qui-25-n-apoio-208", room: "Sala 208" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "qui-25-n-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "qui-25-n-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "qui-25-n-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            }
        }
    },

    "sex-26": {
        label: "Sexta-feira – 26/06",
        emoji: "📅",
        shifts: {
            morning: {
                label: "Manhã",
                emoji: "🌅",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "sex-26-m-cred-213", room: "Sala 213" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "sex-26-m-apoio-213", room: "Sala 213" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "sex-26-m-foto-1", room: "Fotógrafo/Cinegrafista 1" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "sex-26-m-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            },
            night: {
                label: "Noite",
                emoji: "🌙",
                categories: [
                    {
                        id: "credenciamento",
                        name: "Credenciamento",
                        emoji: "🪪",
                        iconClass: "credenciamento",
                        slots: [
                            { id: "sex-26-n-cred-213", room: "Sala 213" },
                            { id: "sex-26-n-cred-212", room: "Sala 212" },
                            { id: "sex-26-n-cred-209", room: "Sala 209" }
                        ]
                    },
                    {
                        id: "apoio",
                        name: "Apoio interno das salas",
                        emoji: "🤝",
                        iconClass: "apoio",
                        slots: [
                            { id: "sex-26-n-apoio-213", room: "Sala 213" },
                            { id: "sex-26-n-apoio-212", room: "Sala 212" },
                            { id: "sex-26-n-apoio-209", room: "Sala 209" }
                        ]
                    },
                    {
                        id: "cobertura",
                        name: "Cobertura de fotos e vídeos",
                        emoji: "📸",
                        iconClass: "cobertura",
                        slots: [
                            { id: "sex-26-n-foto-1", room: "Fotógrafo/Cinegrafista 1" },
                            { id: "sex-26-n-foto-2", room: "Fotógrafo/Cinegrafista 2" }
                        ]
                    },
                    {
                        id: "lucyane",
                        name: "Apoio da Profa. Lucyane",
                        emoji: "👩‍🏫",
                        iconClass: "lucyane",
                        slots: [
                            { id: "sex-26-n-lucy-1", room: "Assistente" }
                        ]
                    }
                ]
            }
        }
    }
};
