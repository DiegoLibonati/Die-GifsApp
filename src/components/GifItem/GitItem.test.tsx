import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { GifItem } from "./GifItem";

type RenderComponent = {
  props: {
    title: string;
    url: string;
    avatar: string;
    avatarName: string;
    avatarDescription: string;
    avatarProfileUrl: string;
    gifDownload: string;
    handleOpenModalImage: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    title: "Title",
    url: "https://google.com.ar",
    avatar: "Avatar",
    avatarName: "AvatarName",
    avatarDescription: "AvatarDescription",
    avatarProfileUrl: "https://google.com.ar",
    gifDownload: "GifDownload",
    handleOpenModalImage: jest.fn(),
  };

  const { container } = render(
    <GifItem
      avatar={props.avatar}
      avatarDescription={props.avatarDescription}
      avatarName={props.avatarName}
      avatarProfileUrl={props.avatarProfileUrl}
      gifDownload={props.gifDownload}
      title={props.title}
      url={props.url}
      handleOpenModalImage={props.handleOpenModalImage}
    />
  );

  return {
    container: container,
    props: props,
  };
};

test("It must render the gif card with the information received by props.", () => {
  const { props } = renderComponent();

  const imgs = screen.getAllByRole("img");
  const imgGif = imgs.find((img) => img.id === "gif");
  const imgAvatar = imgs.find((img) => img.id === "avatar");
  const avatarName = screen.getByRole("heading", { name: props.avatarName });
  const avatarDescription = screen.getByText(props.avatarDescription);
  const linkUserProfile = screen.getByRole("link", {
    name: /go to user profile/i,
  });
  const linkDownload = screen.getByRole("link", { name: /download gif/i });
  const title = screen.getByText(props.title);

  expect(imgGif).toBeInTheDocument();
  expect(imgGif).toHaveAttribute("src", props.url);
  expect(imgGif).toHaveAttribute("alt", props.title);
  expect(imgAvatar).toBeInTheDocument();
  expect(imgAvatar).toHaveAttribute("src", props.avatar);
  expect(imgAvatar).toHaveAttribute("alt", props.avatarName);
  expect(avatarName).toBeInTheDocument();
  expect(avatarDescription).toBeInTheDocument();
  expect(linkUserProfile).toBeInTheDocument();
  expect(linkUserProfile).toHaveAttribute("href", props.avatarProfileUrl);
  expect(linkUserProfile).toHaveAttribute("target", "_blank");
  expect(linkDownload).toBeInTheDocument();
  expect(linkDownload).toHaveAttribute("href", props.gifDownload);
  expect(linkDownload).toHaveAttribute("target", "_blank");
  expect(title).toBeInTheDocument();
});

test("The 'handleOpenModalImage' function should be executed when the card title is clicked.", async () => {
  const { props } = renderComponent();

  const title = screen.getByText(props.title);

  expect(title).toBeInTheDocument();

  await user.click(title);

  expect(props.handleOpenModalImage).toHaveBeenCalledTimes(1);
  expect(props.handleOpenModalImage).toHaveBeenCalledWith(
    props.url,
    props.title
  );
});
