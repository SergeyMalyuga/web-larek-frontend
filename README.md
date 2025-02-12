# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

---

## Установка и запуск:
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

--- 
## Сборка

```
npm run build
```

или

```
yarn build
```
---

## Архитектура приложения

Код приложения делится на три слоя согласно MVP-паттерну:
- `View` - слой представления, отвечает за отображение данных на странице.
- `Model` - слой данных, отвечает за хранение и изменение данных.
- `Presenter` презентер, отвечает за связь представления и данных. Cвязан и с моделью, и с отображением.

---

### Базовый код

#### Класс Api
Содержит в себе базовую логику работы с сервером, даёт возможность получать и отправлять данные. 
В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт 
- переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть 
- переопределен заданием третьего параметра при вызове.

#### Класс Event
Классическая реализация брокера событий. Позволяет отправлять события и подписываться на события, 
происходящие в системе.  Класс используется в презентере для обработки событий и в слоях приложения 
для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие.
- `emit` - инициализация события.
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

---

### Данные и типы данных, используемые в приложении

Продукт:
```
export interface IItem {
id: string,
description: string,
image: string,
title: string,
category: string,
price: number
}
```

Заказ:
```
export interface IOrder {
payment: string,
email: string,
phone: string,
address: string,
total: number,
items: string[]
}
```

Интерфейс для инициализации события:
```
export interface IEventEmitter {
emit: (event: string, data?: unknown) => void
}
```
---
### Слой данных
#### Класс ProductModel
Класс отвечает за хранение и логику работы с данными карточек товара.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `_products: IProduct[]` - массив объектов карточек товаров.
- `_preview: string | null` - id карточки, выбранной для просмотра в модальной окне.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий.

Методы для взаимодействия с данными:
- сеттеры и геттеры для сохранения и получения данных из полей класса

### Класс BasketModel
Класс отвечает за хранение и логику работы с данными корзины.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `_items: Map<string, number>` - структура данных, которая хранит в себе информацию о товарах в корзине.\
`Ключ:` id товара. \
`Value:` количество товара в корзине. \
Количество товара не может превышать 1 шт.
- `_total: number` - общая стоимость всех товаров в корзине.

Методы для взаимодействия с данными:
-	`add(item: string): void` - добавить товар в корзину.
-	`remove(item: string): void` - удалить товар из корзины
- сеттеры и геттеры для сохранения и получения данных из полей класса

### Класс OrderModel
Класс отвечает за хранение и логику работы с заказом.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `_order: IOrder` - объект который хранит информацию о заказе.

Методы для взаимодействия с данными:
- сеттеры и геттеры для сохранения и получения данных из полей класса

---

### Слой представления.
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

### Класс Page
Реализует главную страницу - каталог товаров с счётчиком. Имеет набор сеттеров, отвечающих за DOM-элементы главной страницы. \

События:<br> 
- `basket:open` - при клике на кнопку корзины.
- `order:open` - при клике на карточку товара.
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\
В полях класса хранятся следующие данные:
- `_counter` - элемент счетчика на странице.
-  `_catalog` - элемент каталога на странице.
-  `_wrapper` - элемент обертки на странице.
-  `_basket` - элемент корзины на странице.

### Класс ModalProduct
Реализует окно с карточкой товара.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\

События:<br>
- `basket:change` - при клике на кнопку "купить".
- `modal:close` - при клике на кнопку "закрыть".
В полях класса хранятся следующие данные:
- `button-close`
- `button-buy`

### Класс ModalBasket
Реализует окно с корзиной товаров.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\

События:<br>
- `order:open` - при клике на кнопку "оформить".
- `modal:close` - при клике на кнопку "закрыть".
В полях класса хранятся следующие данные:
- `button-order`
- `button-delete`

### Класс ModalOrder
Реализует окно оформления заказа.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\

События:<br>
- `order:next` - при клике на кнопку "далее".
- `modal:close` - при клике на кнопку "закрыть".
В полях класса хранятся следующие данные:
- `inputAdress` - элемент для ввода адреса.
- `button-next`

### Класс ModalContacts
Реализует окно контактов.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\

События:<br>
- `order: pay` - при клике на кнопку "оплатить".
- `modal:close` - при клике на кнопку "закрыть".
В полях класса хранятся следующие данные:
- `inputEmail` - элемент для ввода email.
- `inputPhone` - элемент для ввода phone.
- `button-pay`

### Класс ModalSuccess
Реализует окно успешного оформления заказа.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\

События:<br>
- `order: main-page` - при клике на кнопку "За новыми покупками".
- `modal:close` - при клике на кнопку "закрыть".
В полях класса хранятся следующие данные:
- `button-success`

---

### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

## События

*События изменения данных (генерируются классами моделями данных)*

- `basket:change` - изменение списка товаров корзины. \

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*

- `modal:open` - открытие модального окна.
- `modal:close` - закрытие модального окна.
- `basket:open` - открытие модального окна корзины.
- `order:open` - открытие модального окна оформления заказа.
- `card:open` - открытие модального окна с карточкой.
- `order: next` - событие генерируемой при нажатии "Далее" в форме оформления заказа.
- `order: pay` - событие генерируемой при нажатии "Оплатить" в форме оформления заказа.
- `order: main-page` - событие генерируемой при нажатии "За новыми покупками" в форме подтверждения успешного офрмления заказа.



