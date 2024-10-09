import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
} from "../utils";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  // benefitImage2,
  // iPhone14,
  // iPhone14Pro,
  iPhone16,
  iPhone16Pro,
  iPhone16ProMax,
  iPhone15,
  iPhone15Pro,
  iPhone15ProMax,
} from "../assets";
export const benefits = [
  {
    id: "0",
    title: "iPhone 16",
    text: "Enjoy the next generation of mobile technology with the iPhone 16. With a larger display and improved performance, this phone is perfect for daily use and entertainment.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: iPhone16,
  },
  {
    id: "1",
    title: " iPhone 16 Pro",
    text: "Discover powerful features and a sleek design with the iPhone 16 Pro. Its enhanced camera, advanced performance, and premium build make it the choice for tech enthusiasts..",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: iPhone16Pro,
    light: true,
  },

  {
    id: "2",
    title: "iPhone 16 Pro Max",
    text: "Experience the ultimate in mobile technology with the iPhone 16 Pro Max. With its superior display, professional camera system, and exceptional performance, it’s ideal for creative professionals and photography lovers.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: iPhone16ProMax,
  },
  {
    id: "3",
    title: " iPhone 15 ",
    text: "The iPhone 15 combines cutting-edge technology with everyday functionality. Its advanced features and sleek design offer a balanced experience for all users.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: iPhone15,
    light: true,
  },
  {
    id: "4",
    title: "iPhone 15 Pro",
    text: "The iPhone 15 Pro is designed for those who demand more. With an upgraded processor, improved camera, and premium build, it’s perfect for professional and personal use.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: iPhone15Pro,
  },
  {
    id: "5",
    title: "iPhone 15 Pro Max",
    text: "Get the best mobile experience with the iPhone 15 Pro Max. With its large display, powerful performance, and top-tier camera system, this phone is designed for professionals and those who want the very best.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: iPhone15ProMax,
  },
];

export const navLists = ["Home", "Shop", "Cart", "Dashboard"];

export const navList = ["Sign up", "Sign in"];

export const navigation1 = [
  {
    id: "0",
    title: "Sign up",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "1",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "../pages/Home.jsx",
  },
  {
    id: "1",
    title: "Shop",
    url: "../pages/Shop.jsx",
  },
  {
    id: "2",
    title: "Cart",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Dashboard",
    url: "#roadmap",
  },
];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const models = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    img: blueImg,
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: whiteImg,
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: blackImg,
  },
];

export const sizes = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

export const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];
