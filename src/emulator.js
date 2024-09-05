const emulator = {
    StartCashin: function (cb) {
        console.log("Купюроприемник активирован. Нажмите '1', '5', '10', чтобы принять купюру.");
        const handler = function (event) {
            if (event.key === '1' || event.key === '5' || event.key === '10') {
                const amount = parseInt(event.key, 10) * 100;
                cb(amount);
                console.log(`Принята купюра номиналом ${amount} руб.`);
            } else if (event.key === 'Escape') {
                console.log("Купюроприемник остановлен.");
                window.removeEventListener('keydown', handler);
                emulator.StopCashin();
            }
        };
        window.addEventListener('keydown', handler);
    },
    StopCashin: function () {
        console.log("Купюроприемник деактивирован.");
    },
    BankCardPurchase: function (amount, cb, display_cb) {
        console.log(`Запрошено списание с карты на сумму ${amount} руб.`);
        display_cb('Приложите карту');

        const handler = function (event) {
            if (event.key === 'Enter') {
                setTimeout(() => display_cb('Обработка карты'), 500);
                setTimeout(() => display_cb('Связь с банком'), 1000);
                setTimeout(() => {
                    cb(true);
                    display_cb('Транзакция успешна');
                    console.log('Списание с карты успешно');
                }, 1500);
                window.removeEventListener('keydown', handler);
            } else if (event.key === 'Escape') {
                cb(false);
                display_cb('Транзакция неуспешна');
                console.log('Списание с карты неуспешно');
                window.removeEventListener('keydown', handler);
                emulator.BankCardCancel();
            }
        };
        window.addEventListener('keydown', handler);
    },
    BankCardCancel: function () {
        console.log("Операция по карте отменена.");
    },
    Vend: function (product_idx, cb) {
        console.log(`Выдача напитка с индексом ${product_idx}`);
        setTimeout(() => {
            cb(true);
            console.log('Напиток успешно выдан');
        }, 2000);
    }
};

export default emulator;
