import laravel from "../images/skill/laravel.png"
import react from "../images/skill/react.png"
import express from "../images/skill/express.png"
import spring from "../images/skill/spring.png"
import codeIgniter from "../images/skill/codeigniter.png"

import js from "../images/skill/js.png"
import php from "../images/skill/php.png"
import java from "../images/skill/java.png"

import mySQL from "../images/skill/mysql.png"
import postgreSQL from "../images/skill/postgresql.png"
import mongoDB from "../images/skill/mongodb.png"

import git from "../images/skill/git.png"
import postmanAPI from "../images/skill/postmanapi.png"
import nodeJS from "../images/skill/node.png"
import docker from "../images/skill/docker.png"
import gcp from "../images/skill/gcp.png"

const ContentSkill = () => {
    return (
        <div id="skills" className="pt-16 mb-10">
            <h3 className="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Skills & Tech Stack</h3>
            <span className="text-3xl ml-1">🚀</span>
            <div id="skills-container">
                <div className="grid grid-cols-12 items-center mt-5 mb-10" id="skill-item frameworks">
                <h4 className="text-xl font-semibold col-span-3">Frameworks</h4>
                <div id="skill-tag" className="flex gap-5 col-span-9">
                    <img src={laravel} alt="Laravel" title="Laravel" width="70" height="60"/>
                    <img src={react} alt="React.JS" title="React.JS" width="70" height="60"/>
                    <img src={express} alt="Express.JS" title="Express.JS" width="70" height="60"/>
                    <img src={spring} alt="Spring Boot" title="Spring Boot" width="70" height="60"/>
                    <img src={codeIgniter} alt="Codeigniter" title="CodeIgniter" width="60" height="60"/>
                </div>
                </div>
                <div className="grid grid-cols-12 items-center my-10" id="skill-item programming language">
                <h4 className="text-xl font-semibold col-span-3">Programming<br/>Language</h4>
                <div id="skill-tag" className="flex gap-5 col-span-9">
                    <img src={js} alt="Javascript" title="Javascript" width="60" height="40"/>
                    <img src={php} alt="PHP" title="PHP" width="100" height="40"/>
                    <img src={java} alt="Java" title="Java" width="40" height="60"/>
                </div>
                </div>
                <div className="grid grid-cols-12 items-center my-10" id="skill-item databases">
                <h4 className="text-xl font-semibold col-span-3">Databases</h4>
                <div id="skill-tag" className="flex gap-5 col-span-9">
                    <img src={mySQL} alt="MySQL" title="MySQL" width="100" height="40"/>
                    <img src={postgreSQL} alt="PostgreSQL" title="PostgreSQL" width="60" height="40"/>
                    <img src={mongoDB} alt="MongoDB" title="MongoDB" width="40" height="60"/>
                </div>
                </div>
                <div className="grid grid-cols-12 items-center my-10" id="skill-item Other">
                <h4 className="text-xl font-semibold col-span-3">Other</h4>
                <div id="skill-tag" className="flex gap-5 col-span-9">
                    <img src={git} alt="Git" title="Git" width="70" height="50"/>
                    <img src={postmanAPI} alt="Postman API" title="Postman API" width="70" height="50"/>
                    <img src={nodeJS} alt="Node.JS" title="Node.JS" width="60" height="60"/>
                    <img src={docker} alt="Docker" title="Docker" width="60" height="60"/>
                    <img src={gcp} alt="Google Cloud Platform" title="Google Cloud Platform" width="80" height="60"/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ContentSkill;