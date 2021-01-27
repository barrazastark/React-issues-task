export const getReactIssues = () => {
    return new Promise(async resolve => {

        const response = await fetch("https://api.github.com/repos/facebook/react/issues");
        const githubData = await response.json();
        const formatedData = githubData.map(({ title, labels, user, number, comments, created_at, id }) => {
            return {
                id,
                title,
                number,
                comments,
                labels: labels.map(({id, color, name}) => ({ id, color, name})),
                daysAgo: Math.floor((new Date().getTime() - new Date(created_at)) / (1000 * 3600 * 24)),
                user: user.login,
            }
        });
        resolve(formatedData);
    });
}