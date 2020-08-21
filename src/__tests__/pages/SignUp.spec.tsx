import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../../pages/SignUp";

const mockedHistoryPush = jest.fn();
const mockedApi = jest.fn(() => true);
const mockedAddToast = jest.fn();

jest.mock("../../services/api", () => {
  return {
    api: () => ({
      post: mockedApi,
    }),
  };
});

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock("../../hooks/toast", () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe("SignUp Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it("should be able register profile", async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Nome");
    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");

    const buttonElement = getByText("Cadastrar");

    fireEvent.change(nameField, {
      target: { value: "Renato Souza" },
    });

    fireEvent.change(emailField, {
      target: { value: "renatorock3@hotmail.com" },
    });

    fireEvent.change(passwordField, {
      target: { value: "1233456" },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith("/");
    });
  });

  //   it("should be able to validation values in fields to register", async () => {
  //     const { getByPlaceholderText, getByText } = render(<SignUp />);

  //     const nameField

  //   })
});