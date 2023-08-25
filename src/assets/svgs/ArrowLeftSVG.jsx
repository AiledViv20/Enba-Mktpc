import { Icon } from "@chakra-ui/icons";

const ArrowLeftIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16l-4-4m0 0l4-4m-4 4h18"
    />
  </Icon>
);

export default ArrowLeftIcon;
/*
<svg
  class="w-6 h-6"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M7 16l-4-4m0 0l4-4m-4 4h18"
  ></path>
</svg>;
*/
