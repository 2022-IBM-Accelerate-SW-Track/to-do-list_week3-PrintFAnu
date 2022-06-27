import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "08/18/2022";
  fireEvent.change(inputTask, { target: { value: "read book"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "read book"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(/read book/i);
   expect(check.length).toBe(1);
  
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  //makes the date section a variable to be toggled
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  // gets the button as an element to be used
  const element = screen.getByRole('button', {name: /Add/i});
  // this is the input for the test 
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  //clicks the add button
  fireEvent.click(element);
  //needs to check if theirs nothing on the page 
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();



 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  //makes the tasks section a variable to be toggled
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  // gets the button as an element to be used
  const element = screen.getByRole('button', {name: /Add/i});
  // this is the input for the test 
  const task = "read book";
  fireEvent.change(inputTask, { target: { value: task}});
  //clicks the add button
  fireEvent.click(element);
  //needs to check if theirs nothing on the page 
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "08/18/2022";
  fireEvent.change(inputTask, { target: { value: "read book"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const element2 = screen.getByRole('checkbox');
  fireEvent.click(element2);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();


 });



 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/12/2022";
  fireEvent.change(inputTask, { target: { value: "read book"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByTestId(/read book/i).style.background;
  expect(check).not.toBe("#dcdcd");
 });
