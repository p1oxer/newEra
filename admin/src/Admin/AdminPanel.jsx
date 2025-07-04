import { Admin, defaultDarkTheme, defaultTheme, Resource } from "react-admin";
import ReviewList from "./reviews/ReviewList";
import ReviewEdit from "./reviews/ReviewEdit";
import ReviewCreate from "./reviews/ReviewCreate";
import authProvider from "./AuthProvider";
import LoginPage from "./LoginPage";
import russianMessages from "ra-language-russian";
import polyglotI18nProvider from "ra-i18n-polyglot";
import FAQList from "./FAQ/FAQList";
import FAQCreate from "./FAQ/FAQCreate";
import FAQEdit from "./FAQ/FAQEdit";
import AboutList from "./About/AboutList";
import AboutEdit from "./About/AboutEdit";
import { ContactsList } from "./Contacts/ContactsList";
import { ContactsEdit } from "./Contacts/ContactsEdit";
import { ContactsCreate } from "./Contacts/ContactsCreate";
import { SocialsList, SocialsCreate, SocialsEdit } from "./Socials/Socials";
import { CertificateList, CertificateEdit } from "./Certificates/Certificate";
import {
    BirthdayList,
    BirthdayCreate,
    BirthdayEdit,
} from "./BirthdayOffers/BirthdayOffers";
import { GroupList, GroupCreate, GroupEdit } from "./GroupOffers/GroupOffers";
import { QuestCreate, QuestEdit, QuestList } from "./Quest/Quest";
import adminDataProvider from "./adminDataProvider";

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");
const AdminPanel = () => (
    <Admin
        i18nProvider={i18nProvider}
        basename="/"
        dataProvider={adminDataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        theme={defaultDarkTheme}
    >
        <Resource
            name="reviews"
            list={ReviewList}
            edit={ReviewEdit}
            create={ReviewCreate}
            options={{ label: "Отзывы" }}
        />
        <Resource
            name="faq"
            list={FAQList}
            options={{ label: "Информация" }}
            create={FAQCreate}
            edit={FAQEdit}
        />
        <Resource
            name="about"
            list={AboutList}
            options={{ label: "О нас" }}
            edit={AboutEdit}
        />
        <Resource
            name="contacts"
            list={ContactsList}
            options={{ label: "Контакты" }}
            edit={ContactsEdit}
            create={ContactsCreate}
        />
        <Resource
            name="socials"
            list={SocialsList}
            options={{ label: "Социальные сети" }}
            edit={SocialsEdit}
            create={SocialsCreate}
        />
        <Resource
            name="birthday_offers"
            list={BirthdayList}
            create={BirthdayCreate}
            edit={BirthdayEdit}
            options={{ label: "День рождения" }}
        />
        <Resource
            name="group_offers"
            list={GroupList}
            create={GroupCreate}
            edit={GroupEdit}
            options={{ label: "Школьный класс/выпускной/корпоратив" }}
        />
        <Resource
            name="certificates"
            list={CertificateList}
            edit={CertificateEdit}
            options={{ label: "Сертификат" }}
        />
        <Resource
            name="quests"
            list={QuestList}
            edit={QuestEdit}
            create={QuestCreate}
            options={{ label: "Квесты" }}
        />
    </Admin>
);

export default AdminPanel;
