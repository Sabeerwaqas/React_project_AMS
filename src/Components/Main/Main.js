import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import "./main.css"
import { Link } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import firebase, { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function () {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [teachers,setTeachers]=useState([]);
  const teachersCollectionRef = collection(db, "teachersData");
  const [students, setStudents] = useState([]);
  const studentsCollectionRef = collection(db, "students");
  const [classes, setClasses] = useState([]);
  const classesCollectionRef = collection(db, "classes");



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchTeachersData = async()=>{
      try {
        const querySnapshot = await getDocs(teachersCollectionRef);
        const teachers = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTeachers(teachers);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
  }

    useEffect(() => {
      fetchTeachersData();
    });

    const getStudentData = async () => {
      try {
        const querySnapshot = await getDocs(studentsCollectionRef);
        const studentsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    useEffect(() => {
      getStudentData();
    }, []);

    const getClassesData = async () => {
      try {
        const querySnapshot = await getDocs(classesCollectionRef);
        const classesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    useEffect(() => {
  
      getClassesData();
    }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        <div className="flex-dashboard">
          <div className="flex-child child-one">
            <div className="flex-grandchild">
              <div className="icon-one-parent">
                <PersonIcon className="icon-person icon-one" />
              </div>
              <div className="heading-parent">
                <h2 className="heading-son">{students.length}</h2>
              </div>
            </div>
            <small className="position-rel">Students</small>
          </div>
          <div className="flex-child child-one child-two">
            <div className="flex-grandchild">
              <div>
                <PeopleAltIcon className="icon-person" />
              </div>
              <div className="heading-parent">
                <h2 className="heading-son">{teachers.length}</h2>
              </div>
            </div>
            <small className="position-rel">Teachers</small>
          </div>
          <div className="flex-child child-one child-three">
            <div className="flex-grandchild">
              <div>
                <OtherHousesIcon className="icon-person" />
              </div>
              <div className="heading-parent">
                <h2 className="heading-son">{classes.length}</h2>
              </div>
            </div>
            <small className="position-rel">Classes</small>
          </div>
        </div>
      </Box>
    </Box>
  );
}

