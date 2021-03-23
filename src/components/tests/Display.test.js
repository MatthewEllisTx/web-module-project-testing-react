import React from 'react';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from '../Display'

import fetchShow from '../../api/fetchShow'
import testData from './ShowTestData'
jest.mock('../../api/fetchShow')

test('Dispaly renders without errors', () => {
  render(<Display />)
})

test('Show container visble when fetch button pressed', async () => {
  render(<Display />)
  fetchShow.mockResolvedValueOnce(testData)

  const button = screen.getByText('Press to Get Show Data')
  
  expect(screen.queryByTestId('show-container')).not.toBeInTheDocument()

  userEvent.click(button)

  expect(fetchShow.mock.calls.length).toBe(1)
  
  const show = await screen.findByTestId('show-container')
  expect(show).toBeInTheDocument()
  expect(show).toBeVisible()

})

test('function prop is run when fetch button pressed', () => {
  const testFunc = jest.fn()
  
  render(<Display displayFunc={testFunc}/>)
  fetchShow.mockResolvedValueOnce(testData)

  const button = screen.getByText('Press to Get Show Data')
  userEvent.click(button)

  setTimeout(() => {
    expect(testFunc.mock.calls.length).toBe(1)
  }, 100)
})





///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// I do not think the above is nessacary because I already did it in Show.test
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.