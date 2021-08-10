export const Options = [
    {
        name: 'Activités',
        key: 'activity',
        options: [
            {
                input: 'select',
                name: 'Activité',
                key: 'activity',
                dataProvider: 'cmList',
                required: true,
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/"+ input.value;
                    }
                }
            },
            {
                input: 'text',
                name: 'Texte du lien',
                key: 'linktext',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/desc:\""+ input.value+"\"";
                    }
                }
            },
            {
                input: 'text',
                name: 'Classe CSS',
                key: 'css',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/class:\""+ input.value+"\"";
                    }
                }
            },
            {
                input: 'checkbox',
                name: 'Ouvrir dans un nouvel onglet',
                key: 'newtab',
                getOption: function(input){
                    if (input.checked){
                        return "/b";
                    }
                }
            },
            {
                input: 'checkbox',
                name: 'Ouvrir dans un modal',
                key: 'moda',
                getOption: function(input){
                    if (input.checked){
                        return "/p";
                    }
                }
            },
            {
                input: 'checkbox',
                name: 'Afficher icône',
                key: 'icon',
                getOption: function(input){
                    if (input.checked){
                        return "/i";
                    }
                }
            },
            {
                input: 'checkbox',
                name: 'Afficher case à cocher pour completion',
                key: 'completion',
                getOption: function(input){
                    if (input.checked){
                        return "/c";
                    }
                }
            },
        ]
    },
    {
        name: 'Sections',
        key: 'section',
        options: [
            {
                input: 'select',
                name: 'Section',
                key: 'section',
                dataProvider: 'sectionList',
                required: true,
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/s/"+ input.value;
                    }
                }
            },
            {
                input: 'text',
                name: 'Texte du lien',
                key: 'linktext',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/desc:\""+ input.value+"\"";
                    }
                }
            },
            {
                input: 'text',
                name: 'Classe CSS',
                key: 'css',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/class:\""+ input.value+"\"";
                    }
                }
            },
            {
                input: 'checkbox',
                name: 'Ouvrir dans un nouvel onglet',
                key: 'newtab',
                getOption: function(input){
                    if (input.checked){
                        return "/b";
                    }
                }
            },
            {
                input: 'checkbox',
                name: 'Ouvrir dans un modal',
                key: 'moda',
                getOption: function(input){
                    if (input.checked){
                        return "/p";
                    }
                }
            },
        ]
    },
    {
        name: 'H5P',
        key: 'h5p',
        options: [
            {
                input: 'select',
                name: 'H5P',
                key: 'h5p',
                dataProvider: 'h5pList',
                required: true,
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/h5p/"+ input.value;
                    }
                }
            },
        ]
    },
]