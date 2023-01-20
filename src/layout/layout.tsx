import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  UnstyledButton,
  Group,
  ThemeIcon,
  Box,
  Avatar,
  Stack,
  Title,
  Menu,
} from "@mantine/core";

import {
  IconGitPullRequest,
  IconAlertCircle,
  IconMessages,
  IconDatabase,
  IconChevronRight,
  IconChevronLeft,
  IconSettings,
  IconTrash,
  IconLogout,
} from "@tabler/icons";

type LinkType = {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
};

const links: LinkType[] = [
  {
    icon: <IconGitPullRequest size={16} />,
    color: "blue",
    label: "Pull Requests",
    href: "",
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: "teal",
    label: "Open Issues",
    href: "",
  },
  {
    icon: <IconMessages size={16} />,
    color: "violet",
    label: "Discussions",
    href: "",
  },
  {
    icon: <IconDatabase size={16} />,
    color: "grape",
    label: "Databases",
    href: "",
  },
];

const MainLink = ({ icon, color, label }: LinkType) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colors.dark[0],

        "&:hover": {
          backgroundColor: theme.colors.dark[6],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const MainLinks = () => {
  const linksComponent = links.map((link) => (
    <MainLink {...link} key={link.label} />
  ));
  return <div>{linksComponent}</div>;
};

const UserMenu = () => {
  const theme = useMantineTheme();
  const { data: sessionData } = useSession();

  if (!sessionData) return null;

  const { user } = sessionData;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box>
          <UnstyledButton
            sx={{
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colors.dark[0],
              "&:hover": {
                backgroundColor: theme.colors.dark[6],
              },
            }}
          >
            <Group>
              <Avatar src={user?.image} radius="xl" />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {user?.name}
                </Text>
                <Text color="dimmed" size="xs">
                  {user?.email}
                </Text>
              </Box>

              {theme.dir === "ltr" ? (
                <IconChevronRight size={18} />
              ) : (
                <IconChevronLeft size={18} />
              )}
            </Group>
          </UnstyledButton>
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User quick menu</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          icon={<IconLogout size={14} />}
          onClick={() => void signOut()}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const CustomNavbar = () => {
  return (
    <Stack justify="space-between" style={{ height: "100%" }}>
      <MainLinks />
      <UserMenu />
    </Stack>
  );
};

const CustomFooter = () => {
  return (
    <Footer height={60} p="md">
      Footer
    </Footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { data: sessionData } = useSession();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.dark[8],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ base: 300 }}
        >
          <CustomNavbar />
        </Navbar>
      }
      footer={<CustomFooter />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Title order={3} color="white">
                Games market
              </Title>
            </div>
            <div>
              {!sessionData && (
                <Button onClick={() => void signIn("discord")}>
                  Sign in with Discord
                </Button>
              )}
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
