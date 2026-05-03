export const serverApi: string = `${process.env.REACT_APP_API_URL}`

export const getImageUrl = (path?: string): string => {
    if (!path) return "/icons/user-default.svg";
    if (path.startsWith("http")) return path;
    return `${serverApi}/${path}`;
};

export const Messages = {
    error1: "Something went wrong!",
    error2: "Please login first!",
    error3: "Please fulfill all inputs!",
    error4: "Message is empty!",
    error5: "Only images with jpeg, jpg, png format allowed!",
}