const BASE_URL = "https://new-era-quest.ru"; // Замените на ваш домен

export const seoConfig = {
    home: {
        title: "Новая Эра - Квесты в Вологде | Увлекательные приключения",
        description:
            "Новая Эра - лучшие квесты в Вологде. Увлекательные сюжеты, профессиональные актеры, незабываемые эмоции. Бронируйте квесты онлайн!",
        keywords:
            "квесты, квесты вологда, квест-рум, приключения, развлечения, бронирование квестов, квесты",
        canonical: `${BASE_URL}/`,
        ogImage: `${BASE_URL}/uploads/img/logo-500.webp`,
        ogType: "website",
    },
    quests: {
        title: "Квесты - Новая Эра | Все квесты в Вологде",
        description:
            "Выберите свой идеальный квест из нашей коллекции. Хоррор, приключения - у нас есть квесты для всех вкусов и возрастов.",
        keywords: "квесты вологда, квесты, квесты, хоррор квесты, приключенческие квесты",
        canonical: `${BASE_URL}/quests`,
        ogImage: `${BASE_URL}/uploads/img/quests/1749900905478-5hkh2vb-540.webp`,
        ogType: "website",
    },
    questCategory: {
        title: (categoryName) => `${categoryName} - Квесты | Новая Эра`,
        description: (categoryName) =>
            `Квесты в категории "${categoryName}" от Новой Эры. Увлекательные сюжеты и профессиональные актеры ждут вас!`,
        keywords: (categoryName) =>
            `квесты ${categoryName.toLowerCase()}, квесты ${categoryName.toLowerCase()}, ${categoryName.toLowerCase()} вологда`,
        canonical: (categorySlug) => `${BASE_URL}/quests/${categorySlug}`,
        ogImage: `${BASE_URL}/uploads/img/quests/1749900905478-5hkh2vb-540.webp`,
        ogType: "website",
    },
    questPage: {
        title: (questName) => `${questName} - Квест | Новая Эра`,
        description: (questName, description) =>
            `квест "${questName}" от Новой Эры. ${description}`,
        keywords: (questName) =>
            `квест ${questName?.toLowerCase()}, квест ${questName?.toLowerCase()}, бронирование квестов`,
        canonical: (questSlug) => `${BASE_URL}/quests/${questSlug}`,
        ogImage: (imagePath) => `${BASE_URL}${imagePath}`,
        ogType: "article",
    },
    information: {
        title: "Информация - Новая Эра | Правила и условия",
        description:
            "Узнайте правила посещения квест-комнат, условия бронирования и всю необходимую информацию для комфортного отдыха в Новой Эре.",
        keywords:
            "правила квест-комнат, условия бронирования, информация о квестах, безопасность",
        canonical: `${BASE_URL}/information`,
        ogImage: `${BASE_URL}/uploads/img/logo-500.webp`,
        ogType: "website",
    },
    contacts: {
        title: "Контакты - Новая Эра | Свяжитесь с нами",
        description:
            "Свяжитесь с нами для бронирования квестов, получения консультации или решения любых вопросов. Мы всегда на связи!",
        keywords:
            "контакты квест-комнат, бронирование квестов, адрес квест-рума, телефон",
        canonical: `${BASE_URL}/contacts`,
        ogImage: `${BASE_URL}/uploads/img/logo-500.webp`,
        ogType: "website",
    },
    group: {
        title: "Большая компания - Квесты для групп | Новая Эра",
        description:
            "Специальные предложения для больших компаний в Новой Эре. Увлекательные квесты для корпоративов, дней рождений и вечеринок.",
        keywords:
            "квесты для групп, корпоративные квесты, квесты на день рождения, большая компания",
        canonical: `${BASE_URL}/group`,
        ogImage: `${BASE_URL}/uploads/img/logo-500.webp`,
        ogType: "website",
    },
    birthday: {
        title: "День рождения - Квесты на праздник | Новая Эра",
        description:
            "Отмечайте день рождения в Новой Эре! Уникальные сюжеты и незабываемые эмоции для вашего праздника. ",
        keywords:
            "квесты на день рождения, празднование дня рождения, квесты для праздников",
        canonical: `${BASE_URL}/birthday`,
        ogImage: `${BASE_URL}/uploads/img/logo-500.webp`,
        ogType: "website",
    },
    certificate: {
        title: "Подарочные сертификаты - Новая Эра | Подарки на квесты",
        description:
            "Подарочные сертификаты на квесты - идеальный подарок для любителей приключений.",
        keywords:
            "подарочные сертификаты квесты, подарки на квесты, сертификаты на развлечения",
        canonical: `${BASE_URL}/sertificate`,
        ogImage: `${BASE_URL}/uploads/img/Sertificates/01-560.webp`,
        ogType: "website",
    },
    notFound: {
        title: "Страница не найдена - Новая Эра",
        description:
            "К сожалению, запрашиваемая страница не найдена. Перейдите на главную страницу или выберите интересующий вас раздел.",
        keywords: "страница не найдена, 404, квесты вологда",
        canonical: `${BASE_URL}/404`,
        ogImage: `${BASE_URL}/uploads/img/logo-500.webp`,
        ogType: "website",
        noindex: true,
    },
};

export default seoConfig;
