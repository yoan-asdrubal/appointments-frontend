describe('Appointment Dialog', () => {
    it('should show Appointment Dialog to create appointment from MONTH view mode from random day', function () {
        cy.visit('/appointment');
        let pos = 0;
        const addZeroToDigit = (digit) => {
            if (+digit < 10)
                return `0${digit}`;
            return digit;
        };
        cy.get('mwl-calendar-month-cell').its('length')
            .then((length) => {
                pos = (Math.floor((Math.random() * length)));
                cy.get('mwl-calendar-month-cell').its(pos).rightclick();

                cy.get('.sh-context-menu--item div').its(0).click();
                cy.get('app-appointment-dialog').should('have.length', 1);

                console.log('pos', pos);

                cy.get('mwl-calendar-month-cell > div').its(pos).invoke('attr', 'date')
                    .then((val) => {
                        const date = new Date(val);
                        const dateStr = `${addZeroToDigit(date.getMonth() + 1)}-${addZeroToDigit(date.getDate())}-${date.getFullYear()}`
                        console.log('dateStr', val, dateStr);

                        const hour = addZeroToDigit(date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
                        const minutes = addZeroToDigit(date.getMinutes() > 12 ? date.getMinutes() - 12 : date.getMinutes());
                        const timeInit = date.toString().indexOf('00:00:00') > -1 ? '8:00 AM' : `${hour}:${minutes}${date.getHours() < 12 ? ' AM' : ' PM'}`;
                        const timeEnd = '5:00 PM';
                        cy.get('[data-cy="appointment-date"]').should('have.value', dateStr);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                        cy.get('[data-cy="appointment-timeEnd"]').should('have.value', timeEnd);
                    });
            });


    });
})
