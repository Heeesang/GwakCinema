export const formatDate = () => {
    const today = new Date();

    return (
        `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`
    )
}