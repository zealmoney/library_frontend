import React from "react";
import { useState, useEffect } from "react";
import API from "../services/API";
import moment from 'moment';
import Headers from "./Headers";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Segment } from "semantic-ui-react";
import PaginationComponent from "./PaginationComponent";
import HomePagination from "./HomePagination";


const DesktopContainerPagination = () => {
    return(
        <div>
            <Headers />
            <HomePagination/>
            <Footer />
        </div>
    )
};

export default DesktopContainerPagination;