import {
  MantineProvider,
  ColorSchemeProvider,
  Center,
  Stack,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import RepoCard from "./cards/RepoCard";
import ProfileCard from "./cards/ProfileCard";

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ primaryColor: "teal", colorScheme }}
          withNormalizeCSS
          withGlobalStyles
        >
          <Center py="xl">
            <Stack>
              <RepoCard owner="mantinedev" repoName="mantine" />
              <ProfileCard username="derinasir" />
            </Stack>
          </Center>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
