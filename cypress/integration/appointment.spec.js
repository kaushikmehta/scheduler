const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("End to End Testing", () => {
  before(() => {
    cy.request("GET", "/api/debug/reset")
  })

  beforeEach(() => {

    cy.visit("/")
    cy
      .contains("[data-testid=day]", "Monday")
  })

  it("should book an appointment", () => {

    cy
      .get("[alt=Add]")
      .first()
      .click();

    cy
      .get("[data-testid=student-name-input]")
      .type("Kaush")

    cy
      .get("[alt='Sylvia Palmer']")
      .click();

    cy
      .contains("button", "Save")
      .click()

    cy.contains(".appointment__card--show", "Kaush");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

  it("should edit an appointment", () => {
    cy
      .contains("Kaush")
      .get("[alt=Edit]")
      .last()
      .click({ force: true })

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("should cancel an appointment", () => {
    cy
      .contains("Archie Cohen")
      .get("[alt=Delete]")
      .last()
      .click({ force: true })
    cy
      .contains("Confirm")
      .click()

    cy.contains("DELETING Interview").should("exist");
    cy.contains("DELETING Interview").should("not.exist");
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .should("not.exist");


  })



})