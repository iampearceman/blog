import React from 'react';
import { Card } from '@/components/ui/card';

const GitHubComments = ({ owner, repo }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Create script element for GitHub utterances
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', `${owner}/${repo}`);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'preferred-color-scheme');
    script.setAttribute('crossorigin', 'anonymous');

    // Add script to container
    const commentsContainer = document.getElementById('comments-container');
    if (commentsContainer) {
        commentsContainer.appendChild(script);
      setIsLoaded(true);
    }

    return () => {
      if (commentsContainer) {
        commentsContainer.innerHTML = '';
        setIsLoaded(false);
      }
    };
  }, [owner, repo]);

  return (
    <Card className="w-full p-6 mt-8 border-none bg-transparent">
      <div className="text-lg font-semibold mb-4">Comments</div>
      <div 
        id="comments-container"
        className={`min-h-32 ${!isLoaded ? 'flex items-center justify-center' : ''}`}
      >
        {!isLoaded && <div className="text-gray-500">Loading comments...</div>}
      </div>
    </Card>
  );
};

export default GitHubComments;