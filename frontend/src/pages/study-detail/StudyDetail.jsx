import React from "react";
import styles from "./StudyDetail.module.css";
import StudyDetailNav from "./StudyDetailNav";
import StudyContent from "./StudyContent.jsx";
import HabitRecordTable from "./HabitRecordTable";
import EditStudyModalImpl from "../../components/editStudyModal/EditStudyModalImpl";

//  url 에 id param으로 들어올것

const StudyDetail = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <StudyDetailNav />

        <StudyContent />

        <HabitRecordTable />
        <EditStudyModalImpl />
      </div>
    </section>
  );
};

export default StudyDetail;
