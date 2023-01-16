import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import userEvent from '@testing-library/user-event'
import App from "./App"

describe('App Component', () => {
  let container

  //beforeEach can't be an arrow function
  beforeEach(function () {
    container = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      ).container
  })
  it('Shows the All Entries heading', () => {
    // expect(container.querySelector("h2")).toBeDefined()
    // expect(container.querySelector("h2")).toHaveTextContent("Journal Entries")
    a(container, "h2", "Journal Entries")
  })

  it("Shows category selection page when Select Category is clicked", async () => {
    await userEvent.click(screen.getByText('Select Category'))
    expect(container.querySelector("h2")).toBeDefined()
    expect(container.querySelector("h2")).toHaveTextContent("Please select a category:")
  })
})

function a(container, tag, text) {
  expect(container.querySelector(tag)).toBeDefined()
  expect(container.querySelector(tag)).toHaveTextContent(text)
}