import React from "react";
import "../styles/TopicListItem.scss";

const TopicListItem = (props) => {
  const { selectTopic } = props;

  return (
    <div className="topic-list__item" onClick={()=> selectTopic(props.data.id)}>
      <span>{props.data.title}</span>
    </div>
  );
};

export default TopicListItem;
