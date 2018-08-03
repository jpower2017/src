import React from "react";
import Avatar from "material-ui/Avatar";
import { List, ListItem, makeSelectable } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import { grey400, cyan600, white } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
//import Wallpaper from "material-ui/svg-icons/device/wallpaper";
import AddNote from "material-ui/svg-icons/action/note-add";
import GlobalStyles from "../styles";
import Change from "material-ui/svg-icons/action/change-history";
import Discription from "material-ui/svg-icons/action/description";
import Open from "material-ui/svg-icons/action/open-in-browser";
import PageView from "material-ui/svg-icons/action/pageview";
import HighLightOff from "material-ui/svg-icons/action/highlight-off";
import CircleAdd from "material-ui/svg-icons/image/control-point";
import Edit from "material-ui/svg-icons/image/edit";
import * as R from "ramda";

const ListWidget = props => {
  const {
    data,
    color,
    color2,
    color3,
    title,
    onclick,
    primaryText,
    ondelete,
    bDelete,
    onType,
    hideIcons,
    onAdd,
    secondaryText1,
    secondaryText2
  } = props;

  const styles = {
    subheader: {
      fontSize: 18,
      fontWeight: typography.fontWeightLight,
      backgroundColor: color2,
      color: white,
      height: "40px"
    },
    paper: {
      borderRadius: "10px"
    }
  };

  const iconButtonElement = (
    <IconButton touch={true} tooltipPosition="bottom-left">
      <MoreVertIcon color={grey400} />
    </IconButton>
  );
  /*
  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onClick={ondelete}>Delete</MenuItem>
      <MenuItem onClick={() => console.log("onclick genie")}>
        Add geneology
      </MenuItem>
    </IconMenu>
  );
*/
  const getUrgentColor = urgent => {
    return urgent ? { backgroundColor: "#aa0000" } : null;
  };

  const rowRightIcons = i => {
    return (
      <div style={{ marginTop: "10px" }}>
        <HighLightOff onClick={() => ondelete(i)} />
      </div>
    );
  };
  const rowLeftIcon = item => {
    return (
      <div style={{ marginTop: "10px" }}>
        <Edit onClick={() => onclick(item.id)} />
      </div>
    );
  };

  const getID = item => {
    console.log("getId");
    const id = R.prop("id", item);
    console.log(id);
    const arrGift = R.path(["gift"], item);
    const newArrGift = !!R.filter(x => x.id !== id, arrGift)
      ? R.filter(x => x.id !== id, arrGift)
      : [];

    newArrGift.push({ id: id });
    item.gift = newArrGift;

    onType(item);
  };
  const getText = arr => {
    if (arr) {
      return R.map(x => `${x.name},      `, arr);
    } else {
      return;
    }
  };
  const getSubText = (arrField1, arrField2) => {
    let str = "";
    str = arrField1 ? R.map(x => x.name, arrField1) : "";
    str += arrField2 ? R.map(x => x.name, arrField2) : "";
    //return str.toString().slice(0, -1);
    return str;

    //return R.map(x => x.name, obj[field1]);
  };
  return (
    <div style={{ padding: "10px" }}>
      <Paper
        zDepth={GlobalStyles.depth.n}
        style={(styles.paper, { backgroundColor: color })}
      >
        <List style={{ maxHeight: 320, overflow: "auto", width: "400px" }}>
          <Subheader style={styles.subheader}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItem: "flex-start",
                margin: "0px 16px 10px 0px",
                cursor: "pointer"
              }}
            >
              <div>{title}</div>
              <div>
                {!hideIcons && (
                  <CircleAdd
                    color="#fff"
                    style={{ cursor: "pointer" }}
                    onClick={() => onAdd()}
                  />
                )}
              </div>
            </div>
          </Subheader>

          {props.data.map((item, i) => (
            <div
              key={item.title}
              style={{
                fontWeight: typography.fontWeightMedium
              }}
            >
              <ListItem
                leftAvatar={rowLeftIcon(item)}
                rightAvatar={rowRightIcons(item.id)}
                primaryText={
                  item[primaryText]
                    ? item[primaryText]
                    : `${item["firstName"]} ${item["lastName"]}`
                }
                secondaryText={getSubText(
                  item[secondaryText1],
                  item[secondaryText2]
                )}
                style={(getUrgentColor(item.urgent), { fontSize: "large" })}
              />
              <Divider style={{ height: "1.5px" }} />
            </div>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default ListWidget;
