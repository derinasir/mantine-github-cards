import {
  Card,
  Avatar,
  Group,
  Text,
  Title,
  Divider,
  ThemeIcon,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Star, GitFork, BrandGithub, Share } from "tabler-icons-react";

import * as repo_mockdata from "../mockdata/repo_mockdata.json";

const RepoCard = ({ repoName, owner }) => {
  const clipboard = useClipboard();
  const repoApiLink = `https://api.github.com/repos/${owner}/${repoName}`;
  const [repoData, setRepoData] = useState({});

  useEffect(() => {
    fetch(repoApiLink)
      .then((res) => res.json())
      .then((json) => setRepoData(json));
  }, [repoApiLink]);

  // Since anonymous GitHub API requests are limited with 60 request
  // per hour (and React useEffect runs on every file save), mockdata.json
  // has mock repo data to use.

  // useEffect(() => setRepoData(repo_mockdata), []);

  return (
    <Card p="md" shadow="lg">
      <Group>
        <Avatar
          size="lg"
          radius="lg"
          src={repoData.owner?.avatar_url ?? null}
        />
        <div>
          <Title order={4}>{repoData?.name}</Title>
          <Text>{repoData?.owner?.login}</Text>
        </div>
      </Group>
      <Text my="xl">{repoData.description}</Text>
      <Card.Section my="sm">
        <Divider />
      </Card.Section>
      <Group mt="md" position="apart">
        <Group spacing="xl">
          <Tooltip label="Stars" position="bottom">
            <Group spacing={5}>
              <ThemeIcon variant="light" size="xs" color="yellow">
                <Star size={12} />
              </ThemeIcon>
              <Text size="xs" color="dimmed">
                {repoData?.stargazers_count}
              </Text>
            </Group>
          </Tooltip>
          <Tooltip label="Forks" position="bottom">
            <Group spacing={5}>
              <ThemeIcon variant="light" size="xs" color="cyan">
                <GitFork size={12} />
              </ThemeIcon>
              <Text size="xs" color="dimmed">
                {repoData?.forks}
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
              href={repoData.html_url}
            >
              Open in GitHub
            </Text>
          </Group>
          <Group spacing={5}>
            <Tooltip
              label={clipboard.copied ? "Copied!" : "Share"}
              color={clipboard.copied ? "teal" : "gray"}
              position="bottom"
            >
              <ActionIcon
                onClick={() => clipboard.copy(repoData.html_url)}
                size="xs"
                variant="light"
                color={clipboard.copied ? "teal" : "gray"}
              >
                <Share size={12} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Group>
    </Card>
  );
};

export default RepoCard;
