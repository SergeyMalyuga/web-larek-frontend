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

```
export interface IProduct {
	id: string,
	description: string,
	image: string,
	title: string,
	category: string,
	price: number | null
}
```

```
export interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}
```

```
export interface IOrder extends IOrderForm {
	items: string[];
}
```

```
export interface IOrderLot{
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
```

```
export interface IOrderResult {
	id: string;
	total: number;
}
```

```
export interface IActivity {
	onClick: (event: MouseEvent) => void;
}
```

```
export type FormErrors = Partial<Record<keyof IOrder, string>>;
```

---
### Слой данных

#### Класс ApiModel 
Класс ApiModel является потомком класса Api, основной функционал взаимодействие с сервером, получение и отправка данных.\
В полях класса хранятся следующие данные:
- `cdn: string` - URL-адрес, указывающий на ресурс или конечную точку CDN.
- `items: IProduct[]` - массив объектов карточек товаров.

Методы для взаимодействия с данными:
- `getProductCards` - получение массива объектов с сервера.
- `postOrder` - отправка заказа и получение ответа от сервера.

#### Класс BasketModel
Класс отвечает за хранение и логику работы с данными корзины.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `basketProducts` - массив товаров в корзине;

Методы для взаимодействия с данными:
- `getCounter` - возвращает количество товаров в корзине.
- `getTotalProducts` - возвращает общую сумму всех товаров в корзине.
- `setSelectedСard` - добавляет товар в корзину.
- `deleteCardFromBasket` - удаляет товар из корзины.
- `clearBasket` - удаляет все товары из корзины.

#### Класс DataModel
Класс отвечает за хранение и логику работы с данными карточек товара.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `productCards` - массив всех карточек.
- `selectedСard` - выбранная карточка.

Методы для взаимодействия с данными:
- `setPreview` - получает данные карточки, которую открыл пользователь.
- сеттеры и геттеры для сохранения и получения данных из полей класса

### Класс FormModel
Класс отвечает за хранение и логику работы с заказом.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- `payment` 
- `email` 
- `phone`
- `address` 
- `total` 
- `items` 

Методы для взаимодействия с данными:
- `setOrderAddress` - принимаем/сохраняет адрес пользователя.
- `validateOrder` - проверяет адрес пользователя / и способ оплаты.
- `setOrderData` - принимаем/сохраняет номер телефона/почту пользователя.
- `validateContacts` - проверяет номер телефона/почту пользователя.
- `getOrderLot` - возвращает объект данных пользователя с выбранными товарами.
- сеттеры и геттеры для сохранения и получения данных из полей класса

---

### Слой представления.
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

### Класс Basket
Отвечает за отображение корзины.

Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.\
В полях класса хранятся следующие данные:
- `basket` - элемент корзины.
- `title` - заголовок.
- `basketList` - лист продуктов.
- `button` - основная кнопка.
- `basketPrice` - общая сумма товаров в корзине.
- `basketButton` - кнопка корзины на главном экране.
- `basketCounter` - количество товаров в корзине.

Методы в классе:
- `renderBasketCounter` - сохраняет и устанавливает количество товаров в корзине.
- `renderTotalProducts` - сохраняет и устанавливает сумму всех товаров в корзине.
- `render` - получить готовый элемент.

### Класс BasketItem
Отвечает за отображение элементов в корзине.\
В полях класса хранятся следующие данные:
- `basketItem` - товар в корзине.
- `index` - номер товара в корзине.
- `title` название товара в корзине.
- `price` - цена товара в корзине;
- `buttonDelete` - кнопка удаления товара из корзины.

Методы в классе:
- `setPrice` - принимает цену продукта в числовом значении и возвращает в строчном.
- `render` - получить готовый элемент.


### Класс Card
Отвечает за отображение карточки товара.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.

В полях класса хранятся следующие данные:
- `_cardElement` - элемент карточки.
- `_cardCategory` - категория карточки.
- `_cardTitle` - заголовок карточки.
- `_cardImage` - изображение карточки.
- `_cardPrice` - цена товара.
- `_categories` - массив всех доступных категорий для карточки.

Методы в классе:
- `setText` - задаёт текстовое содержимое HTMLElement.
- `cardCategory` - создаёт новый className для HTMLElement.
- `setPrice` - принимает цену продукта в числовом значении и возвращает в строчном.
- `setImage` - задаёт изображение.
- `render` - получить готовый элемент.

### Класс CardPreview
Класс CardPreview является потомком класса Card и отвечает за отображением описания карточки товара в 
превью, предоставляет возможность добавить карточку в корзину.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.

В полях класса хранятся следующие данные:
- `text` - подробное описание товара.
- `button` - основная кнопка.

Методы в классе:
- `getButtonLabel` - получить текст кнопки.
- `render` - получить готовый элемент.

### Класс Contacts
Отвечает за отображение модального окна с контактными данными.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.

В полях класса хранятся следующие данные:
- `formContacts` - элемент формы.
- `inputAll` - массив всех элементов ввода.
- `buttonSubmit` - кнопка отправки.
- `formErrors` - форма ошибки.

Методы в классе:
- `render` - получить готовый элемент.
- `valid` - делает кнопку активной или нет, в зависимости от результатов валидации.

### Класс Order
Отвечает за отображение содержимого модального окна заказа и принимает от пользователя метод оплаты и адрес.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.

В полях класса хранятся следующие данные:
- `formOrder` - элемент формы.
- `paymentButtons` - массив кнопок выбора оплаты.
- `paymentSelection` - выбранный способ оплаты.
- `formErrors` - форма ошибки;

Методы в классе:
- `paymentSelection` - устанавливает выбранный способ оплаты.
- `valid` - делает кнопку активной или нет, в зависимости от результатов валидации.
- `render` - получить готовый элемент.

### Класс Modal
Отвечает за отображение модальных окон.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.

В полях класса хранятся следующие данные:
- `button-success` - кнопка "За новыми покупками!".

Методы в классе:
- `open` - отображает модальное окно.
- `close` - закрывает модальное окно.
- `render` - получить готовый элемент.

### Класс Success
Отвечает за отображение модального окна успешного оформления заказа.\
Конструктор класса принимает HTMLTemplateElement и инстант брокера событий.

В полях класса хранятся следующие данные:
- `success` - элемент формы;
- `description` - описание;
- `button` - основная кнопка;

Методы в классе:
- `render` - получить готовый элемент.

---

### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

## События

- `modal:open` - открытие модального окна.
- `modal:close` - закрытие модального окна.
- `modalCard:open` - открытие модального окна.
- `modalCard:close` - закрытие модального окна.
- `cards:get` - получить все карточки продуктов.
- `card:addBasket` - добавить товар в корзину.
- `modalCard:open` - открыть модальное окно с карточкой.
- `basket:open` - открыть модальное окно с корзиной.
- `basket:basketItemRemove` - удалить товар из корзины.
- `order:open` - открыть модальное окно заказа.
- `order:paymentSelection` - установить выбранный способ оплаты.
- `order:changeAddress` - изменение ввёденных данных в форме заполнения адреса.
- `contacts:open` - открыть модальное окно ввода контактных данных.
- `contacts:changeInput` - изменение ввёденных данных в форме заполнения контактов.
- `success:open` - открытие модального окна успешного оформления заказа.
- `success:close` - закрытие модального окна успешного оформления заказа.



