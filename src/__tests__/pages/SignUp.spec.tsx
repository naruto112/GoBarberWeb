import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../../pages/SignUp";

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedFormRef = jest.fn();

jest.mock("../../services/api", () => {
  return {
    post: jest.fn(),
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

jest.mock("", () => {
  return {
    useRef: () => ({
      FormRef: mockedFormRef,
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

  it("should be able to validation values in fields to register", async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Nome");
    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");

    const buttonElement = getByText("Cadastrar");

    fireEvent.change(nameField, {
      target: { value: "Renato Souza" },
    });

    fireEvent.change(emailField, {
      target: { value: "not-email-validation" },
    });

    fireEvent.change(passwordField, {
      target: { value: "1233456" },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith("/");
    });
  });
});
