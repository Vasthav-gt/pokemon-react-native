> Using expo to simulate in both ios, Android and web
Tested in both devices Iphone SE and Pixel 4A
> Make sure you have android sdk and ios simulators installed
- Noticed there is a CORS issue within the expo ios device when calling external API; Works sometimes though. 
No unusual behavior for Android devices works as expected

> Stories covered

- Story 1: Setup and Configuration
As a developer, I need to set up the React Native project and install necessary dependencies like
Redux and Redux Toolkit, so that I can start developing the application with the required frameworks
and libraries.

Used Redux tool kit

- Story 2: Explore Pokémon
As a user, I want to view a list of Pokémon with their names and icons displayed in a grid layout, so
that I can easily explore and choose my favorite Pokémon to learn more about or add to my cart.

- Story 3: Manage Cart
As a user, I want to add Pokémon to my cart, adjust quantities, and remove items, so that I can
manage my selections before making a purchase.

- Bonus Story: Dynamic Pricing Based on Weight
As a user, I want the cost of Pokémon in my cart to be calculated based on their weight, so that I can
see how the unique attributes of each Pokémon affect their purchase price.

- Bonus Story: Implement Lazy Loaded Redux Slice

> Run the app

- npm ci
- Open Android Virtual Device Manager run any phone simulator (I used Pixel 4A)
- npm run android (Installs expo app in simulator and open pokemon app)