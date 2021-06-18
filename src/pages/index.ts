import dynamic from "next/dynamic";

// Disable SSR because we generate the test in browser
// and will always mismatch with server generated test
const Home = dynamic(() => import("@pages/Home"), {
  ssr: false,
});

export default Home;
