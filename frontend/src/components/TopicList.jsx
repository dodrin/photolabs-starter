import React from "react";
import "../styles/TopicList.scss";
import TopicListItem from "./TopicListItem";

const TopicList = (props) => {
  const { state } = props;

  return (
    <div className="top-nav-bar__topic-list">
      {state.topicData.map((topic) => (
        <TopicListItem {...props} key={topic.id} data={topic}/>
      ))}
    </div>
  );
};

export default TopicList;
