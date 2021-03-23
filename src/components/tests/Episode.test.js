import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
  id:1,
  name: "",
  image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
  season: 1,
  number: 1,
  summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, fugit.',
  runtime: 1
}

const testEpisodeWithoutImage = {
  //Add in approprate test data structure here.
  id:1,
  name: "",
  season: 1,
  number: 1,
  summary: "",
  runtime: 1
}

test("renders without error", () => {
  render(<Episode episode={testEpisode}/>)
  // screen.getByText('bruh') test fail
});

test("renders the summury test passed as prop", ()=>{
  render(<Episode episode={testEpisode}/>)
  
  const summery = screen.getByText('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, fugit.') // fails if text is not present
  expect(summery).toBeVisible() // fails if not visible. I made sure by setting opacity to 0
});

test("renders default image when image is not defined", ()=>{
  render(<Episode episode={testEpisodeWithoutImage} />)

  const img = screen.getByAltText('./stranger_things.png') // fails if alt is not this. will not work if alt != src, but it does in this case
  expect(img.src).toEqual('http://localhost/stranger_things.png') // technically not nessicary, but if source != alt this is what I would do
})

//Tasks
//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use no more then 3 different expect statements to test the the existance of the summary value.
//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.