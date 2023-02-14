# Meet APP

## Project description

This project is a meeting app to display events around you and meet your friends.
The objective is to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Key Features

Filter events by city.
Show/hide event details.
Specify number of events.
Use the app when offline.
Add an app shortcut to the home screen.
View a chart showing the number of upcoming events by city.

#### User Stories

As a user,
I should be able to **filter events by city**.
So that I can see the list of events that take place in that city.

As user,
I should be able to **show/hide an event's details**.
So that I can see the details of the events displayed.

As user,
I should be able to **specify the number of events**.
So that I can have an overview about how many events are active in that search.

As user,
I should be able to **have the app available offline**.
So that I can use the app without internet.

As user,
I should be able to **add an app shortcut to my home screen**.
So that I can reach the app easily and faster.

As user,
I should be able to **display a chart showing the number of upcoming events by city.**
So that I can track my events and organize my time.

#### Scenarios

**FILTER EVENTS BY CITY**

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.

- **Given** user hasn’t searched for any city
- **When** the user opens the app
- **Then** the user should see a list of all upcoming events

**Scenario 2:** User should see a list of suggestions when they search for a city.
**Given** the main page is open
**When** user starts typing in the city search box
**Then** the user should see a list of cities (suggestions) that match what they’ve typed

**Scenario 3:**  User can select a city from the suggested list.

- **Given** the user was typing “Berlin” in the city search box and the list of suggested cities is showing
- **When** the user selects a city (e.g., “Berlin, Germany”) from the list
- **Then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

**SHOW/HIDE AN EVENT’S DETAILS**

**Scenario 1:** An event element is collapsed by default
**Given** user have a list of all events
**When** the user is in the main page searching for events
**Then** the user should be able to show the event’s details

**Scenario 2:** User can expand an event to see its details
**Given** user is in the event page
**When** user is reading the event’s detail
**Then** should appear a brief description about event detail and be able to expand the details

**Scenario 3:** User can collapse an event to hide its details

- **Given** user is in the event page
- **When** user is reading full event’s description
- **Then** should be able to hide description to have only a brief description

**SPECIFY NUMBER OF EVENTS**

**Scenario 1:** When user hasn’t specified a number, 32 is the default number.
**Given** user have a list of all events
**When** user is choosing the city to see all the events
**Then** user can select how many events he should see in the main page, if nothing is selected by the user will display 32 events by default

**Scenario 2:** User can change the number of events they want to see.
**Given** user have a list of all events
**When** go to the bottom of all event’s page
**Then** user can select how many events he should see in the main page

**USE THE APP WHEN OFFLINE**

**Scenario 1:** Show cached data when there’s no internet connection.
**Given** when no internet connection
**When** user try to search for new events
**Then** show cached data from the last online session

**Scenario 2:** Show error when user changes the settings (city, time range).
**Given** when no internet connection
**When** user change setting in the app
**Then** Display a error message showing that the user have no internet connection available

**DATA VISUALIZATION**

**Scenario 1:** Show a chart with the number of upcoming events in each city.
**Given** when is in the home page
**When** user log in the app
**Then** show a chart with the number of upcoming events in each city.

#### Technical Dependencies

- React
- TDD technique
- Google Calendar API and OAuth2 authentication flow
- AWS lambda
- React axios and async/await

#### Testing Tools

Lighthouse’s PWA

###### [Meet app](https://afonsord.github.io/meet)
