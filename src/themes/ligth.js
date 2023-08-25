import { extendTheme } from "@chakra-ui/react";

import Button from "./button";
import Badge from "./badge";
import Link from "./link";
import Input from "./input";

const colors = {
  brand: {
    600: "#064A73",
    500: "#064A73",
  },
  accent: {
    600: "#064A73",
    500: "#064A73",
  },
};

const styles = {
  global: {
    a: {
      color: "#000",
    },
  },
};

const shadows = {
  outline: "0 0 0 3px rgba(255,205,0, 0.6)",
  // 255,205,0
};

const components = {
  Button,
  Badge,
  Link,
  Input,
};

const lightTheme = extendTheme({ colors, styles, shadows, components });

export default lightTheme;
