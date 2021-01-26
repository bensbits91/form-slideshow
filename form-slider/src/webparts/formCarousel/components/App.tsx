import * as React from 'react';
import AwesomeSlider from "react-awesome-slider"
import 'react-awesome-slider/dist/styles.css';

import { 
  Provider,
  Link,
  withNavigationContext,
  withNavigationHandlers
} from "react-awesome-slider/dist/navigation";

// Wrapp the AwesomeSlider component with the navigationHandlers
const NavigationSlider = withNavigationHandlers(AwesomeSlider);

// Create an AwesomeSlider instance with some content
const Slider = () => {
  return (
    <NavigationSlider
      className="awesome-slider"
      media={[
        {
          slug: "page-one",
          className: "page-one",
          children: () => <p>Page One</p>
        },
        {
          slug: "page-two",
          className: "page-two",
          children: () => <p>Page Two</p>
        }
      ]}
    />
   )
}

// Page header navigation
const Header = () => {
  return (
    <div>
      <nav>
        <Link href="page-one">Page One</Link>
        <Link href="page-two">Page Two</Link>
      </nav>
    </div>
  )
}

// Wrapp the aplication with the navigation Provider passing down the current page slug.
const App = () => {
  const slug = "[THE INITIAL RENDERED SLUG]";

  return (
    <Provider slug={slug}>
      <Header />
      <NavigationSlider />
    </Provider>
  )
}

export default App;