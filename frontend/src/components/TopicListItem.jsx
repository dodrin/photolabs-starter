import React from "react";
import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {
  const { selectTopic, data } = props;

  return (
    <div className="topic-list__item" onClick={()=> selectTopic(data.id)}>
      <span>{data.title}</span>
    </div>
  );
};

export default TopicListItem;
