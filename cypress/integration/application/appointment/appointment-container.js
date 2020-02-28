const addZeroToDigit = (digit) => {
  if (+digit < 10)
    return `0${digit}`;
  return digit;
};

describe('Appointment Container', () => {
  it('should render calendar month view by default', () => {
    cy.visit('/appointment');
    cy.get('app-appointment-container mwl-calendar-month-view').should('have.length', 1);
    cy.get('app-appointment-container mwl-calendar-week-view').should('have.length', 0);
    cy.get('app-appointment-container mwl-calendar-day-view').should('have.length', 0);

    cy.get('[data-cy="btn-month-view"]').should('have.class', 'active');

  });

  it('should change view mode when click on buttons view mode', () => {
    // cy.visit('/appointment');
    const select = (type) => {
      cy.get(`[data-cy="btn-${type}-view"]`).click();
      cy.get(`[data-cy="btn-${type}-view"]`).should('have.class', 'active');

      cy.get(`app-appointment-container mwl-calendar-${type}-view`).should('have.length', 1);
      cy.get('[data-cy="calendar-content"] > *').should('have.length', 1);
    };

    select('week');
    select('day');
    select('month');

  });

  it('should show selected view mode with color primary and others with color default', function () {
    // cy.visit('/appointment');
    cy.get(`[data-cy="btn-month-view"]`).should("have.class", 'mat-primary');
    cy.get(`[data-cy="btn-week-view"]`).should("not.have.class", 'mat-primary');
    cy.get(`[data-cy="btn-day-view"]`).should("not.have.class", 'mat-primary');

    cy.get(`[data-cy="btn-week-view"]`).click();
    cy.get(`[data-cy="btn-week-view"]`).should("have.class", 'mat-primary');
    cy.get(`[data-cy="btn-month-view"]`).should("not.have.class", 'mat-primary');
    cy.get(`[data-cy="btn-day-view"]`).should("not.have.class", 'mat-primary');

    cy.get(`[data-cy="btn-day-view"]`).click();
    cy.get(`[data-cy="btn-day-view"]`).should("have.class", 'mat-primary');
    cy.get(`[data-cy="btn-month-view"]`).should("not.have.class", 'mat-primary');
    cy.get(`[data-cy="btn-week-view"]`).should("not.have.class", 'mat-primary');
  });

  it('should show navigation date pressed with color primary and others with color default', function () {
    // cy.visit('/appointment');
    cy.get(`[data-cy="action-today"]`).should("have.class", 'mat-primary');
    cy.get(`[data-cy="action-prev"]`).should("not.have.class", 'mat-primary');
    cy.get(`[data-cy="action-next"]`).should("not.have.class", 'mat-primary');

    cy.get(`[data-cy="action-prev"]`).click();
    cy.get(`[data-cy="action-prev"]`).should("have.class", 'mat-primary');
    cy.get(`[data-cy="action-today"]`).should("not.have.class", 'mat-primary');
    cy.get(`[data-cy="action-next"]`).should("not.have.class", 'mat-primary');


    cy.get(`[data-cy="action-next"]`).click();
    cy.get(`[data-cy="action-next"]`).should("have.class", 'mat-primary');
    cy.get(`[data-cy="action-prev"]`).should("not.have.class", 'mat-primary');
    cy.get(`[data-cy="action-today"]`).should("not.have.class", 'mat-primary');
  });

  it('should not include weekends when month and week view mode', function () {
    // cy.visit('/appointment');

    cy.get('mwl-calendar-month-view-header .cal-weekend').should('have.length', 0);

    cy.get(`[data-cy="btn-week-view"]`).click();

    cy.get('mwl-calendar-week-view-header div div').should('have.length', 5);
    cy.get('mwl-calendar-week-view-header div div').its(0).should('contain.text', 'Monday');
  });

  it('should show hours between 8:00 AM and 5:00 PM', function () {
    // cy.visit('/appointment');
    cy.get(`[data-cy="btn-week-view"]`).click();
    cy.get('.cal-time-label-column .cal-hour-segment.cal-hour-start').its(0).should('contain.text', '8 AM');
    cy.get('.cal-time-label-column .cal-hour-segment.cal-hour-start').its('length').then((size) => {
      cy.get('.cal-time-label-column .cal-hour-segment.cal-hour-start').its(size - 1).should('contain.text', '5 PM');
    });

    cy.get(`[data-cy="btn-day-view"]`).click();
    cy.get('.cal-day-columns .cal-hour-segment.cal-hour-start').its(0).should('contain.text', '8 AM');
    cy.get('.cal-day-columns .cal-hour-segment.cal-hour-start').its('length').then((size) => {
      cy.get('.cal-day-columns .cal-hour-segment.cal-hour-start').its(size - 1).should('contain.text', '5 PM');
    });
  });

  it('should show dialog to add appointment from context menu', function () {
    // cy.visit('/appointment');
    cy.get(`[data-cy="btn-month-view"]`).click();
    const checkMenuContext = () => {
      cy.get('.sh-context-menu').should('have.length', 1);
      cy.get('.sh-context-menu--item').its(0).should('contain.text', 'Add appointment');
      cy.get('.sh-context-menu--item div').its(0).click();

      cy.get('app-appointment-dialog').should('have.length', 1);
      cy.get('app-appointment-dialog input').its(0).type('{esc}');
    };
    cy.get('mwl-calendar-month-cell').its(0).rightclick();
    checkMenuContext();

    cy.get(`[data-cy="btn-week-view"]`).click();
    cy.get('.cal-day-headers .cal-header').its(0).rightclick();
    checkMenuContext();

    cy.get('mwl-calendar-week-view-hour-segment').its(0).rightclick('topLeft');
    checkMenuContext();

    cy.get(`[data-cy="btn-day-view"]`).click();
    cy.get('mwl-calendar-week-view-hour-segment').its(0).rightclick('topLeft');
    checkMenuContext();

  });

  it('should add appointment  any day in MONTH view mode', function () {
    // cy.visit('/appointment');
    let pos = 0;
    cy.get(`[data-cy="btn-month-view"]`).click();
    cy.get('mwl-calendar-month-cell').its('length')
      .then((length) => {
        pos = (Math.floor((Math.random() * length)));
        cy.get('mwl-calendar-month-cell').its(pos).find('.cal-day-badge')
          .invoke('attr', 'data-cy')
          .then(before => {
            const total = parseInt(before);

            cy.get('mwl-calendar-month-cell').its(pos).rightclick();

            cy.get('.sh-context-menu--item div').its(0).click();
            cy.get('app-appointment-dialog').should('have.length', 1);

            cy.get('mwl-calendar-month-cell > div').its(pos).as('calendar-cell');
            cy.get('@calendar-cell')
              .invoke('attr', 'date')
              .then((val) => {
                const date = new Date(val);
                const dateStr = `${addZeroToDigit(date.getMonth() + 1)}-${addZeroToDigit(date.getDate())}-${date.getFullYear()}`;

                const hour = addZeroToDigit(date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
                const minutes = addZeroToDigit(date.getMinutes());
                const timeInit = date.toString().indexOf('00:00:00') > -1 ? '8:00 AM' : `${hour}:${minutes}${date.getHours() < 12 ? ' AM' : ' PM'}`;
                const timeEnd = '5:00 PM';
                cy.get('[data-cy="appointment-date"]').should('have.value', dateStr);
                cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                cy.get('[data-cy="appointment-timeInit"]').should('have.value', timeInit);
                cy.get('[data-cy="appointment-timeEnd"]').should('have.value', timeEnd);

                cy.get('[data-cy="appointment-subject"]').type('Subject').should('have.value', 'Subject');
                cy.get('[data-cy="appointment-description"]').type('Description').should('have.value', 'Description');
                cy.get('[data-cy="appointment-area"]').type('Area').should('have.value', 'Area');


                cy.get('[data-cy="appointment-ok"]').click();
                console.log('total ',total,  before);
                cy.get('mwl-calendar-month-cell').its(pos).find('.cal-day-badge').should("have.text", '' + (total + 1));
              })


          });
      });
  });
})
