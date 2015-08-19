var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Header = require('../components/shared/header');
var Footer = require('../components/shared/footer');
var Router = require('react-router');
var Actions = require('../actions');
var Link = Router.Link;
var Participant = require('../components/profile/participant')
var Timeline = require('../components/project/project-timeline')
var Description = require('../components/project/project-description')
var ProjectTags = require('../components/project/project-tags')
var Contributors = require('../components/project/project-contrib')
var ProjectMedia = require('../components/project/project-media')
var ProjectMethods = require('../components/project/sharedProjectMethods/')
var ProjectEdit = require('../components/project/edit-components/project-body-edit')
var ProjectStore = require('../stores/project-store');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ProjectStore, 'onChange')
  ],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){ 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return {
      title: 'Project Title',
      location: 'Project Location',
      description: 'Project info',
      technology: ['javascript', 'angular', 'bootstrap', 'html'],
      contributors: ['john', 'bob', 'joe', 'sally'],
      startDate: 'START DATE',
      endDate: 'END DATE',
      orgData: [],
      managerData: [],
      repData: [],
      devData: [],
      swap: false
    };
  },

  componentWillMount: function(){
    Actions.getProject(51);
  },

  onChange: function(event, data){
    console.log("data: ", data)
    this.setState({
      title: data.name,
      location: data.organization.location,
      description: data.description,
      startDate: data.created,
      endDate: data.complete_by,
      owner: data.owner.first_name + data.owner.last_name,
      repData: data.owner
    });
  },

  edit: function() {
    this.setState({
      swap: !this.state.swap
    });
  },

  save: function() {
    var updateData = {
      title: this.state.title,
      description: this.state.description,
    };
    ProjectMethods.updateProject('/project', updateData);
  },

  updateTitle: function(title) {
    this.setState({
      title: title
    });
  },

  updateLocation: function(location) {
    this.setState({
      location: location
    });
  },

  updateDescription: function(description) {
    this.setState({
      description: description
    });
  },

  updateTechnology: function(technology) {
    this.setState({
      technology: technology
    });
  },

  updateContributors: function(contributors) {
    this.setState({
      contributors: contributors
    });
  },

  updateMedia: function(media) {
    this.setState({
      media: media
    });
  },

  profileEdit: function(edit) {
    return edit ? 
      <div>
        <Timeline time={this.state.endDate} />
        <Description desc={this.state.description} />
        <ProjectTags tags={this.state.technology} />
        <Contributors contributors={this.state.contributors} />
        <ProjectMedia />
      </div>
      :
      <div>
        <ProfileHeaderEdit 
            edit={this.save}
            firstName={this.state.userData.first_name}
            lastName={this.state.userData.last_name}
            updateTitle={this.updateTitle}
            updateLocation={this.updateLocation} />
        <BioEdit updateBio={this.updateBio} />
      </div>
  },

  render: function(){
    return (
      <div>
        <Header link='/' title='Browse'/>
        <div>
          <h3> {this.state.title} </h3> 
          <button className='btn btn-warning edit-follow' onClick={this.edit}> Edit/Follow </button>
        </div>
          <Participant 
            repID={this.state.repID} />
          <Participant 
            managerID={this.state.managerID} />
          <button className='btn btn-warning'> Organization Link </button>
          <Timeline 
            start={this.state.startDate}
            end={this.state.endDate} />
          <Description desc={this.state.description} />
          <ProjectTags tags={this.state.technology} />
          <ProjectMedia />
        <Footer />
      </div>
    )
  },
});