import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Group,
  Avatar,
  Title,
  Divider,
  ThemeIcon,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { BrandGithub, Users, Notebook } from "tabler-icons-react";

// import * as user_mockdata from "../mockdata/user_mockdata.json";

const ProfileCard = ({ username }) => {
  const userApiLink = `https://api.github.com/users/${username}`;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(userApiLink)
      .then((res) => res.json())
      .then((json) => setUserData(json));
  }, [userApiLink]);

  // Since anonymous GitHub API requests are limited with 60 request
  // per hour (and React useEffect runs on every file save), mockdata.json
  // has mock user data to use.

  // useEffect(() => setUserData(user_mockdata), []);

  return (
    <Card p="md" shadow="lg">
      <Group>
        <Avatar size="lg" radius="lg" src={userData?.avatar_url ?? null} />
        <div>
          <Title order={4}>{userData?.name}</Title>
          <Text
            variant="link"
            component="a"
            href={userData?.html_url}
            target="_blank"
            color="dimmed"
          >
            @{userData?.login}
          </Text>
        </div>
      </Group>
      <Card.Section mt="md">
        <Divider />
      </Card.Section>
      <Group mt="md" position="apart">
        <Group spacing="xl">
          <Tooltip label="Repositories" position="bottom">
            <Group spacing={5}>
              <ThemeIcon variant="light" size="xs" color="green">
                <Notebook size={12} />
              </ThemeIcon>
              <Text size="xs" color="dimmed">
                {userData?.public_repos}
              </Text>
            </Group>
          </Tooltip>
          <Tooltip label="Followers" position="bottom">
            <Group spacing={5}>
              <ThemeIcon variant="light" size="xs" color="gray">
                <Users size={12} />
              </ThemeIcon>
              <Text size="xs" color="dimmed">
                {userData?.followers}
              </Text>
            </Group>
          </Tooltip>
        </Group>
        <Group spacing="xl">
          <Group spacing={5}>
            <ActionIcon size="xs" variant="filled" color="dark">
              <BrandGithub size={12} />
            </ActionIcon>
            <Text
              size="xs"
              color="dimmed"
              variant="link"
              component="a"
              target="_blank"
              href={userData?.html_url}
            >
              Open in GitHub
            </Text>
          </Group>
        </Group>
      </Group>
    </Card>
  );
};

export default ProfileCard;
