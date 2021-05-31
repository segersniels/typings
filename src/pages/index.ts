import dynamic from "next/dynamic";

// Disable SSR because we generate the test in browser
// and will always mismatch with server generated test
const Page = dynamic(() => import("components/pages/Page"), {
  ssr: false,
});

export default Page;
