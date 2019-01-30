module.exports = {
    page_title: 'Forus platform',
    page_state_titles: {
        home: 'Forus platform',
        funds: 'Fondsen',
        products: 'Aanbiedingen',
        "products-show": 'Aanbieding',
        "products-apply": "Aanbieding kopen",
        vouchers: 'Mijn vouchers',
        voucher: 'Mijn voucher',
        records: 'Eigenschappen', 
        "record-validate": 'Valideer eigenschap',
        "record-validations": 'Validaties',
        "record-create": 'Eigenschap toevoegen',
        "funds-apply": 'Meld u aan voor een fonds',
        "restore-email": 'Inloggen via e-mail',
    },
    languages: {
        en: 'English',
        nl: 'Dutch',
    },
    // PAGES
    // APPLY FOR FUNDS = fund-apply.pug
    fund_apply: {
        header: {
            title: "Mee doen",
            criteria: "Voowaarden (4)",
        },
        buttons: {
            join: "DOE MEE",
        }
    },    

    // FUNDS = funds.pug
    funds: {
        header: {
            title: "Beschikbare fondsen",
        },
        labels: {
            categorie: "CATEGORIEËN",
            criteria: "Voorwaarden (4)",
            location: "Locatie",
            office: "Zuidhorn Gemeente",
            children: "Kinderen",
            count: "1",
            agelimit: "Leeftijdsgrens",
            age: "< 18 jaar oud",
            income: "Inkomensgrens",
            amount: "< € 1118.46",
        },
        buttons: {
            join: "Doe mee",
            more: "BEKIJK MEER",
        },
        status: {
            active: "Actief",
        }
    },

    // HOME = home.pug
    home: {
        header: {
            forus: {
                title: "Generieke webshop voor gemeentelijke regelingen",
                subtitle: "Op deze webshop kun je je aanmelden voor een fonds, vervolgens kun je met een voucher langs winkels, sportverenigingen en/of culturele instellingen gaan.",
                button: 'LEES MEER OVER HOE HET SYSTEEM WERKT',
            },
            nijmegen: {
                title: "Nijmegen. Meedoen-regeling.",
                subtitle: "Welkom op de website van de Meedoen-regeling. In Nijmegen krijgt iedereen de kans om mee te doen.",
                button: 'WAT MOET IK DOEN?', 
            },
            zuidhorn: {
                title: "Zuidhorn. Kindpakket",
                subtitle: "Welkom op de website van het Kindpakket Zuidhorn. Het Kindpakket is een jaarlijks ondersteunende regeling voor kinderen in de gemeente Zuidhorn.",
                button: 'WAT MOET IK DOEN?',
            },
            westerkwartier: {
                title: "Westerkwartier. Kindpakket",
                subtitle: "Welkom op de website van het Kindpakket Westerkwartier. Het Kindpakket is een jaarlijks ondersteunende regeling voor kinderen in de gemeente Westerkwartier.",
                button: 'WAT MOET IK DOEN?',
            },
        },
        blog: {
            forus: {
                title: "Onze blog",
                name: "Blog: Twee nieuwe implementaties van ons platform",
            },
            nijmegen: {
                title: "Onze blog",
                name: "Blog: Nieuw fonds Meedoen-regeling 2019 Nijmegen",
            },
            zuidhorn: {
                title: "Onze blog",
                name: "Blog: Nieuw fonds Kindpakket 2019 Zuidhorn",
            },
            westerkwartier: {
                title: "Onze blog",
                name: "Blog: Nieuw fonds Kindpakket 2019 Westerkwartier",
            },
            more: "Lees meer",
            button: "BEKIJK MEER",
        },
        product: {
            title: "Aanbiedingen",
            select: "Selecteer categorie...",
            search: "Zoek naar een aanbieding",
        },
        map: { 
            forus: {
                title: "Overzicht van alle aanbieders",
                subtitle: "Binnen het Forus platform werken sponsoren en leveranciers samen om de beste diensten en producten te leveren voor het publieke domein.",
            },
            zuidhorn: {
                title: "Overzicht van alle aanbieders",
                subtitle: "Binnen het platform Forus werkt de gemeente Zuidhorn en verschillende aanbieders samen om het beste aanbod te leveren",
            },
            nijmegen: {
                title: "Overzicht van alle aanbieders",
                subtitle: "Binnen het platform Forus werkt de gemeente Nijmegen en verschillende aanbieders samen om de besten diensten en activiteiten aan te bieden. Op deze manier krijgt iedereen een kans om mee te doen",
            },
            westerkwartier: {
                title: "Overzicht van alle aanbieders",
                subtitle: "Binnen het platform Forus werkt de gemeente Westerkwartier en verschillende aanbieders samen om het beste aanbod te leveren",
            },
            button: "BEKIJK DE KAART",
        },
        faq: {
            forus: {
                title: "Veelgestelde vragen",
                faq_one: "Hoe kan ik het Kindpakket activeren?",
                one: "Klik rechts bovenaan op 'Activatiecode'. Vul je e-mailadres en de activatiecode in die je per brief hebt ontvangen. Klik vervolgens op 'versturen'. Je profiel is aangemaakt en je Kindpakket voucher is geactiveerd!",
                faq_two: "Hoe kan ik inloggen op de webshop?",
                two: "Dit kan op meerdere manieren, de makkelijkste is per e-mail. Klik rechts bovenaan op 'Inloggen'. Kies voor 'log in via e-mail'. Vul het e-mailadres in die je ook tijdens de activatie hebt gebruikt en klik op 'Versturen'. Open je e-mail en klik op de link die je hebt ontvangen om in te loggen.",
                faq_three: "Bij welke aanbieders kan ik het Kindpakket besteden?",
                three: "Je kan een overzicht van alle aanbieders terugvinden op de webshop. Ga naar 'Overzicht van alle aanbieders'",
                faq_four: "Ik ben mijn voucher kwijt. Wat moet ik doen?",
                four: "Je kan je voucher altijd terugvinden door in te loggen op de webshop, de voucher kun je uitprinten, naar je e-mail toesturen of zelfs altijd bij hand hebben door gebruik te maken van de Me app.",
                faq_five: "Hoe kan ik zien hoeveel budget ik nog over heb?",
                five: "Na elke betaling wordt er een e-mail toegestuurd met het huidige budget, daarnaast kan je het budget inzien door in te loggen op de webshop of door gebruik te maken van de Me app.",
                faq_six: "Kan ik iets wat ik heb gekocht ruilen/retour brengen?",
                six: "Retour brengen is helaas niet mogelijk. Ruilen misschien wel, vraag de winkelier naar de mogelijkheden.",
                faq_seven: "Moet het budget in een keer besteed worden?",
                seven: "Nee, je hoeft het budget niet in een keer te besteden.",
                faq_eight: "Ik heb meerdere kinderen. Moet ik aan ieder kind perse 300 euro besteden?",
                eight: "Nee, je mag zelf bepalen hoeveel je per kind wilt besteden.",
                faq_nine: "Hoe lang is de voucher geldig?",
                nine: "De voucher is vanaf 1 november 2018 een jaar geldig.",
                faq_ten: "Kan ik de voucher omruilen voor contant geld?",
                ten: "Nee, de waarde van de voucher krijg je niet in contact geld uitbetaald.",
                faq_eleven: "Kan ik iets kopen bij een andere aanbieder die niet op de webshop staat?",
                eleven: "Nee, het budget kan alleen uitgegeven worden bij aanbieders die op de webshop staan.",
                faq_twelve: "Ik heb nog een kind gekregen, kom ik in aanmerking voor een hoger budget?",
                twelve: "Ja dat kan. Neem dan even contact op met de gemeente.",
                faq_thirteen: "Hoe kom ik in aanmerking voor het Kindpakket?",
                thirteen: "Als je denkt recht te hebben op het Kindpakket, neem dan contact op met de gemeente. De gemeente bekijkt dan of je voldoet aan de voorwaarden.",
                faq_fourteen: "Kan ik de voucher aan iemand anders geven?",
                fourteen: "Nee, de voucher is strikt persoonlijk. Je mag de voucher niet aan iemand anders geven. Maakt iemand anders wel gebruik van jouw voucher dan wordt je eigen bedrag lager.",
                faq_fifteen: "Ik zie aanbiedingen op de webshop staan, hoe kan ik een aanbieding kopen?",
                fifteen: "Log in op de webshop en klik op 'Aanbiedingen'. Kies vervolgens de aanbieding die je wilt en klik op 'Koop'. Kies vervolgens het Kindpakket voucher om de aanbieding mee te kopen. Het bedrag van de aanbieding wordt van je Kindpakket voucher afgehaald en er wordt een nieuwe voucher aangemaakt. De nieuwe voucher kan alleen gebruikt worden voor de aanbieding die je hebt gekocht.",
                faq_sixteen: "Ik wil mijn kind zelf de aanbieding op laten halen, maar wil hem niet het Kindpakket voucher meegeven. Wat kan ik doen?",
                sixteen: "Je kan een aanbieding kopen via de webshop, er wordt dan een nieuwe voucher aangemaakt die alleen gebruikt kan worden voor het specifieke aanbod. Deze kun je meegeven aan je kind.",
            },
            zuidhorn: {
                title: "Veelgestelde vragen",
                faq_one: "Hoe kan ik het Kindpakket activeren?",
                one: "Klik rechts bovenaan op 'Activatiecode'. Vul je e-mailadres en de activatiecode in die je per brief hebt ontvangen. Klik vervolgens op 'versturen'. Je profiel is aangemaakt en je Kindpakket voucher is geactiveerd!",
                faq_two: "Hoe kan ik inloggen op de webshop?",
                two: "Dit kan op meerdere manieren, de makkelijkste is per e-mail. Klik rechts bovenaan op 'Inloggen'. Kies voor 'log in via e-mail'. Vul het e-mailadres in die je ook tijdens de activatie hebt gebruikt en klik op 'Versturen'. Open je e-mail en klik op de link die je hebt ontvangen om in te loggen.",
                faq_three: "Bij welke aanbieders kan ik het Kindpakket besteden?",
                three: "Je kan een overzicht van alle aanbieders terugvinden op de webshop. Ga naar 'Overzicht van alle aanbieders'",
                faq_four: "Ik ben mijn voucher kwijt. Wat moet ik doen?",
                four: "Je kan je voucher altijd terugvinden door in te loggen op de webshop, de voucher kun je uitprinten, naar je e-mail toesturen of zelfs altijd bij hand hebben door gebruik te maken van de Me app.",
                faq_five: "Hoe kan ik zien hoeveel budget ik nog over heb?",
                five: "Na elke betaling wordt er een e-mail toegestuurd met het huidige budget, daarnaast kan je het budget inzien door in te loggen op de webshop of door gebruik te maken van de Me app.",
                faq_six: "Kan ik iets wat ik heb gekocht ruilen/retour brengen?",
                six: "Retour brengen is helaas niet mogelijk. Ruilen misschien wel, vraag de winkelier naar de mogelijkheden.",
                faq_seven: "Moet het budget in een keer besteed worden?",
                seven: "Nee, je hoeft het budget niet in een keer te besteden.",
                faq_eight: "Ik heb meerdere kinderen. Moet ik aan ieder kind perse 300 euro besteden?",
                eight: "Nee, je mag zelf bepalen hoeveel je per kind wilt besteden.",
                faq_nine: "Hoe lang is de voucher geldig?",
                nine: "De voucher is vanaf 1 november 2018 een jaar geldig.",
                faq_ten: "Kan ik de voucher omruilen voor contant geld?",
                ten: "Nee, de waarde van de voucher krijg je niet in contact geld uitbetaald.",
                faq_eleven: "Kan ik iets kopen bij een andere aanbieder die niet op de webshop staat?",
                eleven: "Nee, het budget kan alleen uitgegeven worden bij aanbieders die op de webshop staan.",
                faq_twelve: "Ik heb nog een kind gekregen, kom ik in aanmerking voor een hoger budget?",
                twelve: "Ja dat kan. Neem dan even contact op met de gemeente.",
                faq_thirteen: "Hoe kom ik in aanmerking voor het Kindpakket?",
                thirteen: "Als je denkt recht te hebben op het Kindpakket, neem dan contact op met de gemeente. De gemeente bekijkt dan of je voldoet aan de voorwaarden.",
                faq_fourteen: "Kan ik de voucher aan iemand anders geven?",
                fourteen: "Nee, de voucher is strikt persoonlijk. Je mag de voucher niet aan iemand anders geven. Maakt iemand anders wel gebruik van jouw voucher dan wordt je eigen bedrag lager.",
                faq_fifteen: "Ik zie aanbiedingen op de webshop staan, hoe kan ik een aanbieding kopen?",
                fifteen: "Log in op de webshop en klik op 'Aanbiedingen'. Kies vervolgens de aanbieding die je wilt en klik op 'Koop'. Kies vervolgens het Kindpakket voucher om de aanbieding mee te kopen. Het bedrag van de aanbieding wordt van je Kindpakket voucher afgehaald en er wordt een nieuwe voucher aangemaakt. De nieuwe voucher kan alleen gebruikt worden voor de aanbieding die je hebt gekocht.",
                faq_sixteen: "Ik wil mijn kind zelf de aanbieding op laten halen, maar wil hem niet het Kindpakket voucher meegeven. Wat kan ik doen?",
                sixteen: "Je kan een aanbieding kopen via de webshop, er wordt dan een nieuwe voucher aangemaakt die alleen gebruikt kan worden voor het specifieke aanbod. Deze kun je meegeven aan je kind.",
            },
            nijmegen: {
                title: "Veelgestelde vragen",
                faq_one: "Hoe kan ik de Meedoen-regeling activeren?",
                one: "Klik rechts bovenaan op 'Activatiecode'. Vul uw e-mailadres en de activatiecode in die u per brief hebt ontvangen. Klik vervolgens op 'Volgende'. Uw profiel is aangemaakt en uw Meedoen voucher is geactiveerd!",
                faq_two: "Hoe kan ik inloggen op de webshop?",
                two: "Dit kan op meerdere manieren, de makkelijkste is per e-mail. Klik rechts bovenaan op 'Inloggen'. Kies voor 'log in via e-mail'. Vul het e-mailadres in die u ook tijdens de activatie hebt gebruikt en klik op 'Volgende'. Open uw e-mail en klik op de link die u heeft ontvangen om in te loggen.",
                faq_three: "Bij welke aanbieders kan ik de Meedoen-regeling besteden?",
                three: "U kan een overzicht van alle aanbieders terugvinden op de webshop. Ga naar 'Overzicht van alle aanbieders'",
                faq_four: "Ik ben mijn voucher kwijt. Wat moet ik doen?",
                four: "U kunt uw voucher altijd terugvinden door in te loggen op de webshop, de voucher kunt u uitprinten, naar uw e-mail toesturen of zelfs altijd bij hand hebben door gebruik te maken van de app 'Me'",
                faq_five: "Hoe kan ik zien hoeveel budget ik nog over heb?",
                five: "Na elke betaling wordt er een e-mail toegestuurd met het huidige budget, daarnaast kunt u het budget inzien door in te loggen op de webshop of door gebruik te maken van de app 'Me' .",
                faq_six: "Kan ik iets wat ik heb gekocht ruilen/retour brengen?",
                six: "Retour brengen is helaas niet mogelijk. Ruilen misschien wel, vraag de aanbieder naar de mogelijkheden.",
                faq_seven: "Moet het budget in een keer besteed worden?",
                seven: "Nee, U hoeft het budget niet in een keer te besteden.",
                faq_eight: "Hoe lang is de voucher geldig?",
                eight: "De voucher is vanaf 1 januari een jaar geldig.",
                faq_nine: "Kan ik de voucher omruilen voor contant geld?",
                nine: "Nee, de waarde van de voucher krijg u niet in contact geld uitbetaald.",
                faq_ten: "Kan ik iets kopen bij een andere aanbieder die niet op de webshop staat?",
                ten: "Nee, het budget kan alleen uitgegeven worden bij aanbieders die op de webshop staan.",
                faq_eleven: "Hoe kom ik in aanmerking voor de Meedoen-regeling?",
                eleven: "Als u denkt recht te hebben op de Meedoen-regeling, neem dan contact op met de gemeente. De gemeente bekijkt dan of u voldoet aan de voorwaarden.",
                faq_twelve: "Kan ik de voucher aan iemand anders geven?",
                twelve: "Nee, de voucher is strikt persoonlijk. U mag de voucher niet aan iemand anders geven. Maakt iemand anders wel gebruik van uw voucher dan wordt uw eigen bedrag lager.",
                faq_thirteen: "Ik zie aanbiedingen op de webshop staan, hoe kan ik een aanbieding kopen?",
                thirteen: "Log in op de webshop en klik op 'Aanbiedingen'. Kies vervolgens de aanbieding die u wilt en klik op 'Koop'. Kies vervolgens de Meedoen voucher om de aanbieding mee te kopen. Het bedrag van de aanbieding wordt van uw Meedoen voucher afgehaald en er wordt een nieuwe voucher aangemaakt. De nieuwe voucher kan alleen gebruikt worden voor de aanbieding die u heeft gekocht.", 
            },
            westerkwartier: {
                title: "Veelgestelde vragen",
                faq_one: "Hoe kan ik het Kindpakket activeren?",
                one: "Klik rechts bovenaan op 'Activatiecode'. Vul je e-mailadres en de activatiecode in die je per brief hebt ontvangen. Klik vervolgens op 'versturen'. Je profiel is aangemaakt en je Kindpakket voucher is geactiveerd!",
                faq_two: "Hoe kan ik inloggen op de webshop?",
                two: "Dit kan op meerdere manieren, de makkelijkste is per e-mail. Klik rechts bovenaan op 'Inloggen'. Kies voor 'log in via e-mail'. Vul het e-mailadres in die je ook tijdens de activatie hebt gebruikt en klik op 'Versturen'. Open je e-mail en klik op de link die je hebt ontvangen om in te loggen.",
                faq_three: "Bij welke aanbieders kan ik het Kindpakket besteden?",
                three: "Je kan een overzicht van alle aanbieders terugvinden op de webshop. Ga naar 'Overzicht van alle aanbieders'",
                faq_four: "Ik ben mijn voucher kwijt. Wat moet ik doen?",
                four: "Je kan je voucher altijd terugvinden door in te loggen op de webshop, de voucher kun je uitprinten, naar je e-mail toesturen of zelfs altijd bij hand hebben door gebruik te maken van de Me app.",
                faq_five: "Hoe kan ik zien hoeveel budget ik nog over heb?",
                five: "Na elke betaling wordt er een e-mail toegestuurd met het huidige budget, daarnaast kan je het budget inzien door in te loggen op de webshop of door gebruik te maken van de Me app.",
                faq_six: "Kan ik iets wat ik heb gekocht ruilen/retour brengen?",
                six: "Retour brengen is helaas niet mogelijk. Ruilen misschien wel, vraag de winkelier naar de mogelijkheden.",
                faq_seven: "Moet het budget in een keer besteed worden?",
                seven: "Nee, je hoeft het budget niet in een keer te besteden.",
                faq_eight: "Ik heb meerdere kinderen. Moet ik aan ieder kind perse 300 euro besteden?",
                eight: "Nee, je mag zelf bepalen hoeveel je per kind wilt besteden.",
                faq_nine: "Hoe lang is de voucher geldig?",
                nine: "De voucher is vanaf 1 november 2018 een jaar geldig.",
                faq_ten: "Kan ik de voucher omruilen voor contant geld?",
                ten: "Nee, de waarde van de voucher krijg je niet in contact geld uitbetaald.",
                faq_eleven: "Kan ik iets kopen bij een andere aanbieder die niet op de webshop staat?",
                eleven: "Nee, het budget kan alleen uitgegeven worden bij aanbieders die op de webshop staan.",
                faq_twelve: "Ik heb nog een kind gekregen, kom ik in aanmerking voor een hoger budget?",
                twelve: "Ja dat kan. Neem dan even contact op met de gemeente.",
                faq_thirteen: "Hoe kom ik in aanmerking voor het Kindpakket?",
                thirteen: "Als je denkt recht te hebben op het Kindpakket, neem dan contact op met de gemeente. De gemeente bekijkt dan of je voldoet aan de voorwaarden.",
                faq_fourteen: "Kan ik de voucher aan iemand anders geven?",
                fourteen: "Nee, de voucher is strikt persoonlijk. Je mag de voucher niet aan iemand anders geven. Maakt iemand anders wel gebruik van jouw voucher dan wordt je eigen bedrag lager.",
                faq_fifteen: "Ik zie aanbiedingen op de webshop staan, hoe kan ik een aanbieding kopen?",
                fifteen: "Log in op de webshop en klik op 'Aanbiedingen'. Kies vervolgens de aanbieding die je wilt en klik op 'Koop'. Kies vervolgens het Kindpakket voucher om de aanbieding mee te kopen. Het bedrag van de aanbieding wordt van je Kindpakket voucher afgehaald en er wordt een nieuwe voucher aangemaakt. De nieuwe voucher kan alleen gebruikt worden voor de aanbieding die je hebt gekocht.",
                faq_sixteen: "Ik wil mijn kind zelf de aanbieding op laten halen, maar wil hem niet het Kindpakket voucher meegeven. Wat kan ik doen?",
                sixteen: "Je kan een aanbieding kopen via de webshop, er wordt dan een nieuwe voucher aangemaakt die alleen gebruikt kan worden voor het specifieke aanbod. Deze kun je meegeven aan je kind.",
            },
        },
        guide: {
            forus: {
                title: "Hoe het werkt",
                stepone: "Stap #1",
                one: "U heeft een brief  ontvangen van de gemeente. In de brief staat een activatiecode. Gebruik deze bij stap 2.",
                steptwo: "Stap #2",
                two: "Met de activatiecode kunt u zich aanmelden en de Meedoen-regeling activeren. Druk op ‘Activatiecode’ bovenaan de pagina en vul de gevraagde gegevens in",
                stepthree: "Stap #3",
                three: "Na uw aanmelding wordt de Meedoen-regeling gelijk geactiveerd. De voucher met bijbehorende QR-Code kunt u terugvinden door bovenaan op ‘Mijn vouchers’ te klikken.",
                stepfour: "Stap #4",
                four: "De QR-Code kunt u uitprinten, naar uzelf toe mailen of altijd op uw telefoon hebben door in te loggen op de app 'Me'. De app 'Me' kunt u downloaden via de Google Playstore en de App Store.",
                stepfive: "Stap #5",
                five: "Ga naar de webshop om te zien waar de voucher te besteden is of om een aanbieding te kopen. Laat de bijbehorende QR-Code zien om uw aanbieding af te nemen.",  
            },
            zuidhorn: {
                title: "Hoe het werkt",
                stepone: "Stap #1",
                one: "Je hebt een brief  ontvangen van de gemeente. In de brief staat een activatiecode. Gebruik deze bij stap 2.",
                steptwo: "Stap #2",
                two: "Met de activatiecode kun je je aanmelden en het Kindpakket activeren. Druk op ‘Activatiecode’ bovenaan de pagina en vul de gevraagde gegevens in.",
                stepthree: "Stap #3",
                three: "Na je aanmelding wordt het Kindpakket gelijk geactiveerd. De voucher met bijbehorende QR-Code kan je terugvinden door bovenaan op ‘Mijn vouchers’ te klikken.",
                stepfour: "Stap #4",
                four: "De QR-Code kan je uitprinten, naar jezelf toe mailen of altijd op je telefoon hebben door in te loggen op de Me app. De Me app kun je downloaden via de Google Playstore en de App Store.",
                stepfive: "Stap #5",
                five: "Ga naar de webshop om te zien waar de voucher te besteden is of om een aanbieding te kopen. Laat de bijbehorende QR-Code zien om je aanbieding in ontvangst te nemen.",
            },
            nijmegen: {
                title: "Hoe het werkt",
                stepone: "Stap #1",
                one: "U heeft een brief  ontvangen van de gemeente. In de brief staat een activatiecode. Gebruik deze bij stap 2.",
                steptwo: "Stap #2",
                two: "Met de activatiecode kunt u zich aanmelden en de Meedoen-regeling activeren. Druk op ‘Activatiecode’ bovenaan de pagina en vul de gevraagde gegevens in",
                stepthree: "Stap #3",
                three: "Na uw aanmelding wordt de Meedoen-regeling gelijk geactiveerd. De voucher met bijbehorende QR-Code kunt u terugvinden door bovenaan op ‘Mijn vouchers’ te klikken.",
                stepfour: "Stap #4",
                four: "De QR-Code kunt u uitprinten, naar uzelf toe mailen of altijd op uw telefoon hebben door in te loggen op de app 'Me'. De app 'Me' kunt u downloaden via de Google Playstore en de App Store.",
                stepfive: "Stap #5",
                five: "Ga naar de webshop om te zien waar de voucher te besteden is of om een aanbieding te kopen. Laat de bijbehorende QR-Code zien om uw aanbieding af te nemen.",
            },
            westerkwartier: {
                title: "Hoe het werkt",
                stepone: "Stap #1",
                one: "U heeft een brief  ontvangen van de gemeente. In de brief staat een activatiecode. Gebruik deze bij stap 2.",
                steptwo: "Stap #2",
                two: "Met de activatiecode kunt u zich aanmelden en de Meedoen-regeling activeren. Druk op ‘Activatiecode’ bovenaan de pagina en vul de gevraagde gegevens in",
                stepthree: "Stap #3",
                three: "Na uw aanmelding wordt de Meedoen-regeling gelijk geactiveerd. De voucher met bijbehorende QR-Code kunt u terugvinden door bovenaan op ‘Mijn vouchers’ te klikken.",
                stepfour: "Stap #4",
                four: "De QR-Code kunt u uitprinten, naar uzelf toe mailen of altijd op uw telefoon hebben door in te loggen op de app 'Me'. De app 'Me' kunt u downloaden via de Google Playstore en de App Store.",
                stepfive: "Stap #5",
                five: "Ga naar de webshop om te zien waar de voucher te besteden is of om een aanbieding te kopen. Laat de bijbehorende QR-Code zien om uw aanbieding af te nemen.",
            },
        },
    },

    // APPLY FOR PRODUCT = product-apply.pug
    product_apply: {
        header: {
            title: "Kies voucher",
        },
        labels: {
            transactions: "Transacties",
            last: "Laatste transactie",
            subtract: "(Af)",
            none: "Geen",
            example: "Welke tekst komt hier ?",
        },
        buttons: {
            use: "Gebruik",
        },
        popup: {
            title: "Weet je zeker dat je deze aanbieding '<span class='popup-title-styled'>%s</span>' met een verloopdatum van <span class='popup-title-styled'>%s</span> wil kopen voor <span class='popup-title-styled'>%s</span>? Wanneer bevestigd kan deze transactie niet ongedaan worden gemaakt. Een terugbetaling is niet mogelijk!",
            expiration_information: "De verloopdatum van het product is: <span class='popup-title-styled'>%s</span>. Zorg ervoor dat je tijd hebt om het product voor deze datum op te halen."
        }
    },

    // PRODUCT = product.pug
    product: {
        labels: {
            fund: "Fonds",
            find: "U kunt ons hier vinden",      
        },
        status: {
            active: "Actief",
        },
        buttons: {
            buy: "KOOP",
        }
    },

    // PRODUCTS = Products.pug
    // No translations needed

    // CREATE A RECORD  = record.create.pug
    records_create: {
        header: {
            title: "Eigenschappen aanmaken",
         },        
        buttons: {
            choose: {
                description: "Selecteer de categorie waaraan je de eigenschap wil toevoegen.",
                c_description: "Kies het type eigenschap dat je wil aanmaken.",
                category: "Kies categorie",
                type: "Kies type",
                    },
            cancel: "ANNULEER",
            next: "VOLGENDE",
            type: "EIGENSCHAP TYPE",
            text: "TEKST",
            back: "TERUG",
            confirm: "BEVESTIG",
            }
    },

    // VALIDATE A RECORD = record-validate.pug
    records_validate: {
        header: { 
            title: "Mijn eigenschappen",
        },
        labels: {
            validators: "Validators",
        },
        status: {
            hold: "Wachten",
        },
        buttons: {
            send: "VERZENDEN",
        }
    },

    // VALIDATIONS OF THE RECORDS = record-validations.pug
    records_validations: {
        header: { 
            title: "Mijn eigenschappen",
        },
        labels: {
            count: "validaties",
            validations: "Validaties",
        },
        buttons: {
            send: "Verstuur een validatieverzoek",
        }
    },

    // RECORDS = records.pug
    records: {
        header: { 
            title: "Mijn eigenschappen",
        },
        labels: {
            count: "validaties",
        },
        buttons: {
            validate: "Valideer",
            create: "Eigenschap aanmaken",
        }
    },

    // VOUCHER = voucher.pug
    voucher: {
        header: {
            title: "Voucher details",
        },
        buttons: {
            send: "E-MAIL NAAR MIJ",
            details: "Bekijk details",
        },
        labels: {
            transactions: "Transacties",
            subtract: "Af",
            fund: "Fonds",
            expire: "Vervaldatum",
            requirements: "Voor voorwaarden van deze aanbieding neem contact op met de aanbieder.",
            office: "Locatie van de aanbieder",
            voucher: "U kunt uw voucher besteden bij de aanbieders op deze locaties",
            shopdetail: "INFORMATIE OVER DE AANBIEDER",
            productdetail: "INFORMATIE OVER DE AANBIEDING",
        }
    },


    // VOUCHERs = vouchers.pug
    vouchers: {
        header: {
            title: "Mijn vouchers",
        },
        labels: {
            transactions: "Transacties",
            last: "Laatste transactie",
            subtract: "(Af)",
            none: "Geen",
            used: "GEBRUIKT",
            generated: "AANGEMAAKT",
            expire: "VERVALDATUM"
        }
    },

// DIRECTIVES
    // PRODUCT BLOCKS = block-products.pug
    block_products: {
        header: {
            title: "Aanbiedingen",
        },
        input : {
            placeholder: "Zoek naar een aanbieding",
        },
        labels: {
            discount: "KORTING",
            old: "VAN",
            new: "VOOR",
            title: "Er zijn geen aanbiedingen",
            subtitle: "Op dit moment zijn er geen aanbiedingen beschikbaar",
        },
        buttons: {
            more: "BEKIJK MEER",
        }
    },
    // CONTACT FORM = contact-form.pug
    contact: {
        header: {
            title: "contact",
            subtitle: "CONTACTGEGEVENS",
        },
        labels: {
            forus: {
                address:"Hooiweg 9, 9801 AJ Zuidhorn",
                phone:"(0594) 508888",
                mail: "kindpakket@zuidhorn.nl",
            },
            zuidhorn: {
                address:"Hooiweg 9, 9801 AJ Zuidhorn",
                phone:"(0594) 508888",
                mail: "kindpakket@zuidhorn.nl",
            },
            nijmegen: {
                address:"Hooiweg 9, 9801 AJ Zuidhorn",
                phone:"(0594) 508888",
                mail: "kindpakket@zuidhorn.nl",
            },
            westerkwartier: {
                address:"Hooiweg 9, 9801 AJ Zuidhorn",
                phone:"(0594) 508888",
                mail: "kindpakket@zuidhorn.nl",
            },
            follow: "Volg ons",
            name: "Naam",
            usermail: "E-mail",
            userphone: "Telefoon",
            organisation: "Organisatie",
            message: "Bericht",
        },
        buttons: {
            send: "VERZENDEN",
        }
    },
    // PRODUCT BLOCK IF IT'S EMPTY = empty-block.pug
    empty_block: {
        guide: "Gebruik de activatie code",
    },
    
    // CRITERIA FOR FUNDS = fund-criterion.pug
    fund_criterion: {
        labels: { 
            forus: {
                location: "Groningen",
            },
            zuidhorn: {
                location: "Zuidhorn",
            },
            nijmegen: {
                location: "Nijmegen",
            },
            westerkwartier: {
                location: "Westerkwartier",
            },
            value: "Eigenschap waarde",
        },
        buttons: {
            validate: "Valideer",
            add: "Voeg een eigenschap toe",
        },
        status: {
            invalid: "Ongeldig",
            valid: "Geldig",
        }
    },

    // GOOGLE MAPS = google-map.pug
    maps: {
        cancel: "Annuleren",
    },

    // PINCODE CHECK = pincode-control.pug
    // No translations needed

    // AUTHENTICATION POPUP = popup-auth.pug
    popup_auth: {
        header: {
            title: "Inloggen op platform Forus",
            subtitle: "Scan de QR-code met de Me App of log in met uw e-mail adres",
        },
        notifications: {
            confirmation: "Het is gelukt!",
            link: "Er is een link naar uw e-mailadres gestuurd. Klik op de link om verder te gaan.",
            invalid: "De activatiecode is ongeldig of al gebruikt.",
            voucher_email: "Uw voucher is verstuurd naar uw mail.",
        },
        buttons: {
            qrcode: "Log in via QR-Code",
            mail: "Log in via e-mail",
            submit: "VOLGENDE",
            cancel: "ANNULEREN",
            confirm: "VOLGENDE",
        },
        labels: {
            timelimit: "U kunt tot 14:55 uur (Nederlandse tijd) inloggen. Daarna verloopt uw sessie.",
            warning: "Sluit dit venster en klik op 'Login' als u de activatiecode al eens heeft gebruikt.",
            join: "Aanmelden",
            scancode: "Scan deze QR-Code met een ander apparaat waar u al op aangemeld bent.",
            mobilecode: "Vul uw toegangscode van de Me App in.",
            mail: "Heeft u een brief van de gemeente ontvangen met een activatiecode en deze nog niet gebruikt? Ga dan verder. Heeft u deze al wel gebruikt? Sluit dan dit venster en klik op 'login'.",
            link: "Vul uw e-mailadres in om een link te ontvangen waarmee u kunt inloggen.",
            code: "Vul de activatiecode in die u per brief hebt ontvangen.",
            voucher_email: "Het is gelukt!",
        },
        input: {
            mail: "Vul uw e-mailadres in",
            coding: "Vul de activatiecode in",
            code: "Activatiecode",
            mailing: "E-mail",
            confirmation: "Bevestig uw e-mailadres",
        }
    },

    // POPUP OFFICES = popup-offices.pug
    popup_offices: {
        header: {
            title_first_part: "We hebben ",
            title_last_part: " aanbieders gevonden",
            subtitle: "Selecteer een om meer informatie te zien",
        },
        labels: {
            mail: "E-MAIL",
            address: "ADRES",
            hours: "OPENINGSTIJDEN",
            none: "Openingstijden onbekend, raadpleeg de aanbieder.",
        },
    },
    
    // PROFILE CARD = profile-card.pug
    profile_card: {
        header: {
            title: "Uw persoonlijke QR-code",
            subtitle: "Laat uw persoonlijke QR-code scannen door een validator.",
        },
        labels: {
            address: "Adres:",
        },
        buttons: {
            share: "Deel",
            copy: "Kopieer",
            vouchers: "VOUCHERS",
            records: "EIGENSCHAPPEN",
        },
    },

    // MENU = top-navbar.pug
    topnavbar: {
        items: {
            funds:"FONDSEN",
            products:"AANBIEDINGEN",
            identity:"Profiel",
        },
        buttons: {
            activate:"Activatiecode",
            login:"Login",
            voucher:"Mijn vouchers",
            records: "Mijn eigenschappen",
            authorize:"Autoriseer apparaat",
            logout:"Uitloggen",
            products:"Aanbiedingen",
            funds: "Fondsen",
        },
    },

    // Modal
    modal: {
        buttons: {
            cancel: "Annuleren",
            confirm: "Bevestig",
            close: "Sluit"
        }
    }
};