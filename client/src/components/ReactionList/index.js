import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Reactions</span>
      </div>
      <div className="card-body">
        {reactions &&
        reactions.map(reaction => (
          <p className="pill mb-3" key={reaction._id}>
            {reaction.reactionBody}<br /><br />
            <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 700 }} className="pill">
              {reaction.username}
            </Link>
            {' '}on {reaction.createdAt}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReactionList;