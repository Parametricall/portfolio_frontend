import React from 'react';
import {
    Button, Card, CardDeck, Container,
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import food from '../images/food.png';
import chatBot from '../images/chat_bot.png';
import phase10 from '../images/phase_10.png';

function LandingPage() {
    return (
        <Container>
            <CardDeck className="mt-5">
                <Card>
                    {/* <Card.Img variant="top" src={food} /> */}
                    <Card.Body>
                        <Card.Title>Cookbook</Card.Title>
                        <Card.Text>
                            A simple cookbook to help keep track of your favourite recipes.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <LinkContainer to="/cookbook">
                            <Button variant="primary">Open App</Button>
                        </LinkContainer>
                    </Card.Footer>
                </Card>
                {/* // <Card> */}
                {/* //   <Card.Img variant="top" src={chatBot}/> */}
                {/*  <Card.Body> */}
                {/*    <Card.Title>Chat System (Coming Soon)</Card.Title> */}
                {/*    <Card.Text> */}
                {/*      An experimental chat system to talk to other active users. */}
                {/*    </Card.Text> */}
                {/*  </Card.Body> */}
                {/*  <Card.Footer> */}
                {/*    <Button variant="primary">Go somewhere</Button> */}
                {/*  </Card.Footer> */}
                {/* </Card> */}
                {/* <Card> */}
                {/*  <Card.Img variant="top" src={phase10}/> */}
                {/*  <Card.Body> */}
                {/*    <Card.Title>Phase 10 (Coming in 2021)</Card.Title> */}
                {/*    <Card.Text> */}
                {/*      My attempt at making a version of the Phase 10 card game, which will suport multiple players. */}
                {/*    </Card.Text> */}
                {/*  </Card.Body> */}
                {/*  <Card.Footer> */}
                {/*    <Button variant="primary">Go somewhere</Button> */}
                {/*  </Card.Footer> */}
                {/* </Card> */}
            </CardDeck>
            {/* // <CardDeck className="mt-5"> */}
            {/* //   <Card> */}
            {/* //     <Card.Body> */}
            {/* //       <Card.Title>Snake (Coming Soon)</Card.Title> */}
            {/* //       <Card.Text> */}
            {/* //         A simple game of classic Snake. */}
            {/* //       </Card.Text> */}
            {/* //     </Card.Body> */}
            {/* //     <Card.Footer> */}
            {/* //       <LinkContainer to='/snake_game'> */}
            {/* //         <Button variant="primary">Start Game</Button> */}
            {/* //       </LinkContainer> */}
            {/* // */}
            {/* //     </Card.Footer> */}
            {/* //   </Card> */}
            {/* //   <Card> */}
            {/* //     <Card.Body> */}
            {/* //       <Card.Title>Todo List (Coming in 2021)</Card.Title> */}
            {/* //       <Card.Text> */}
            {/* //         A basic todo list app to help keep track of important tasks. */}
            {/* //       </Card.Text> */}
            {/* //     </Card.Body> */}
            {/* //     <Card.Footer> */}
            {/* //       <Button variant="primary">Go somewhere</Button> */}
            {/* //     </Card.Footer> */}
            {/* //   </Card> */}
            {/* //   <Card> */}
            {/* //     <Card.Body> */}
            {/* //       <Card.Title>Web Scraper (Coming in 2021)</Card.Title> */}
            {/* //       <Card.Text> */}
            {/* //         An app that will scrap the internet for certain information. Maybe cheapest airplane prices, or */}
            {/* //         an alarm for when a certain item goes on sale. */}
            {/*      </Card.Text> */}
            {/*    </Card.Body> */}
            {/*    <Card.Footer> */}
            {/*      <Button variant="primary">Go somewhere</Button> */}
            {/*    </Card.Footer> */}
            {/*  </Card> */}
            {/* </CardDeck> */}
        </Container>
    );
}

export default LandingPage;
