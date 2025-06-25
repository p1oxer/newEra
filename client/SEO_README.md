# SEO Оптимизация для React Приложения "Новая Эра"

## Что было добавлено

### 1. SEO Компоненты и Хуки

-   `src/components/SEO/SEOHead.jsx` - Компонент для управления мета-тегами
-   `src/hooks/useSEO.js` - Хук для удобного использования SEO в компонентах
-   `src/config/seoConfig.js` - Конфигурация SEO для всех страниц

### 2. SEO Файлы

-   `public/robots.txt` - Инструкции для поисковых роботов
-   `public/sitemap.xml` - Карта сайта для поисковых систем
-   `src/utils/sitemapGenerator.js` - Утилита для генерации sitemap

### 3. Обновленный index.html

-   Добавлены все необходимые мета-теги
-   Open Graph теги для социальных сетей
-   Twitter Card теги
-   Canonical ссылки
-   Оптимизация загрузки

## Как использовать SEO в компонентах

### Простое использование (статичные страницы)

```jsx
import React from "react";
import useSEO from "../hooks/useSEO";

const Home = () => {
    // Используем SEO для главной страницы
    useSEO("home");

    return <div>{/* Ваш существующий контент */}</div>;
};
```

### Использование с динамическими данными

```jsx
import React from "react";
import useSEO from "../hooks/useSEO";

const QuestPage = ({ questData }) => {
    // Используем SEO для страницы квеста с динамическими данными
    useSEO("questPage", {
        title: questData.name,
        description: questData.shortDescription,
        slug: questData.slug,
        image: questData.image,
    });

    return <div>{/* Ваш существующий контент */}</div>;
};
```

## Доступные типы страниц в seoConfig

-   `home` - Главная страница
-   `quests` - Страница всех квестов
-   `questCategory` - Страница категории квестов
-   `questPage` - Страница конкретного квеста
-   `information` - Страница информации
-   `contacts` - Страница контактов
-   `group` - Страница для больших компаний
-   `birthday` - Страница дней рождений
-   `certificate` - Страница сертификатов
-   `notFound` - Страница 404

## Настройка для продакшена

### 1. Обновите домен

В файлах замените `https://your-domain.com` на ваш реальный домен:

-   `src/config/seoConfig.js`
-   `src/utils/sitemapGenerator.js`
-   `public/robots.txt`
-   `public/sitemap.xml`
-   `index.html`

### 2. Обновите изображения

Убедитесь, что пути к изображениям в `seoConfig.js` корректны и указывают на реальные изображения.

### 3. Настройте автоматическую генерацию sitemap

Добавьте в build процесс автоматическую генерацию sitemap.xml:

```javascript
// В package.json добавьте скрипт
"build": "vite build && node scripts/generateSitemap.js"
```

## Проверка SEO

### 1. Проверьте мета-теги

Используйте инструменты:

-   Google Search Console
-   Facebook Sharing Debugger
-   Twitter Card Validator

### 2. Проверьте robots.txt

Перейдите на `your-domain.com/robots.txt`

### 3. Проверьте sitemap.xml

Перейдите на `your-domain.com/sitemap.xml`

## Дополнительные рекомендации

1. **Структурированные данные**: Добавьте JSON-LD разметку для лучшего понимания контента поисковыми системами
2. **Изображения**: Используйте атрибуты `alt` для всех изображений
3. **Скорость загрузки**: Оптимизируйте изображения и используйте lazy loading
4. **Мобильная версия**: Убедитесь, что сайт корректно отображается на мобильных устройствах
5. **SSL сертификат**: Используйте HTTPS для лучшего ранжирования

## Примеры использования в существующих компонентах

### Для Home.jsx

```jsx
import useSEO from "../hooks/useSEO";

export default function Home() {
    useSEO("home");

    return (
        <>
            <Intro />
            <QuestsSwiper block={true} category={"all"} />
            <Reviews />
            <About />
            {/* ... остальной код */}
        </>
    );
}
```

### Для Quests.jsx

```jsx
import useSEO from "../hooks/useSEO";

export default function Quests() {
    useSEO("quests");

    return <section className="quests">{/* ... существующий код */}</section>;
}
```

Теперь ваше React приложение полностью оптимизировано для SEO!
