import React from 'react';

class LessonList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.getless(this)}
          type="button"
          className="list-group-item list-group-item-action"
        >
          {this.props.lessonName}
        </button>
      </React.Fragment>
    );
  }
}

export default LessonList;
