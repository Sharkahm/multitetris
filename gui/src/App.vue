<!--
  SELECT * FROM multitetris.user;
  UPDATE `multitetris`.`game` SET `best_id` = NULL;
  UPDATE `multitetris`.`game` SET `kill_id` = NULL;
  UPDATE `multitetris`.`user` SET `attacker_id` = NULL;
  DELETE FROM `multitetris`.`user`;
  ALTER TABLE `multitetris`.`user` AUTO_INCREMENT = 1;
-->

<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">

          <v-col v-if="login" cols="12" sm="16" md="7">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>MultiTetris</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
              <v-text-field v-model="name" label="Username" required></v-text-field>
                <v-card-actions>
                  <v-btn @click="changeToGame()" color="primary">Play</v-btn>
                  <v-spacer /><v-btn @click="changeToLeaderBoard()" color="primary">Leaderboard</v-btn>
                </v-card-actions>
             </v-card-text> 
            </v-card>
          </v-col>

          <v-col v-if="leaderboard" cols="12" sm="16" md="3">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>MultiTetris</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list dense v-if="leaderboardInfo.length!== 0">
                  <v-list-item-group  color="primary">
                    <v-list-item v-for="(leaderboardInfos, index) in leaderboardInfo" :key="index">
                      <v-list-item-content>
                        <v-list-item-title v-text="leaderboardInfo[index].name + '\n\n\n Level: '+leaderboardInfo[index].level+'\n\n\n Points: '+leaderboardInfo[index].points+'\n\n\n Alive: '+leaderboardInfo[index].alive"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <p v-else style="margin-left: 20px">Keine Spieler</p>
                <v-text-field v-model="passwordTyped" label="pw" :type="show1 ? 'text' : ''"></v-text-field>
                <v-btn @click="startgame()" color="primary">Toggle joinable</v-btn>
                <v-btn @click="endround()" color="primary">End round</v-btn>
             </v-card-text> 
            </v-card>
          </v-col>

          <v-col v-if="game" cols="12" sm="16" md="1">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Target</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                {{this.target}}
                <v-btn @click="attackTarget('random')" color="primary">Random</v-btn><br/><br/>
                <v-btn @click="attackTarget('best')" color="primary">Best</v-btn><br/><br/>
                <v-btn @click="attackTarget('attacker')" color="primary">Attacker</v-btn><br/><br/>
                <v-btn @click="attackTarget('kill')" color="primary">Kill</v-btn><br/><br/>
              </v-card-text>
            </v-card>
          </v-col>   

          <v-col v-if="game" cols="12" sm="16" md="3">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>MultiTetris</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-simple-table :dense="dense" :key="componentKey">
                  <tbody>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[0][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[1][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[2][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[3][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[4][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[5][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[6][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[7][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[8][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[9][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[10][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[11][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[12][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[13][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[14][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[15][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[16][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[17][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[18][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[19][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[20][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[21][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[22][9]}"></td>
                    </tr>
                    <tr>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][0]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][1]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][2]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][3]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][4]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][5]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][6]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][7]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][8]}"></td>
                      <td style="text-align: center;" :class="{blocks: this.grid[23][9]}"></td>
                    </tr>
                  </tbody>
                </v-simple-table>
                <v-card-actions>
                  <v-spacer />
                  <Keypress :key-code="38" event="keyup" @pressed="rotate()" />
                  <Keypress :key-code="40" event="keyup" @pressed="softDrop()" />
                  <Keypress :key-code="37" event="keyup" @pressed="moveLeft()" />
                  <Keypress :key-code="39" event="keyup" @pressed="moveRight()" />
                  
                  <Keypress :key-code="87" event="keyup" @pressed="rotate()" />
                  <Keypress :key-code="83" event="keyup" @pressed="softDrop()" />
                  <Keypress :key-code="65" event="keyup" @pressed="moveLeft()" />
                  <Keypress :key-code="68" event="keyup" @pressed="moveRight()" />

                  <Keypress :key-code="32" event="keyup" @pressed="hardDrop()" />
                  <Keypress :key-code="16" event="keyup" @pressed="useHold()" />
                </v-card-actions>        
              </v-card-text> 
            </v-card>
          </v-col>

          <v-col v-if="game" cols="12" sm="16" md="2">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{this.name}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-toolbar-title>Level: {{this.level}}</v-toolbar-title>
                <v-toolbar-title>Points: {{this.points}}</v-toolbar-title>
                <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Preview</v-toolbar-title>
              </v-toolbar>
              <br/>
                <v-simple-table :dense="dense" :key="componentKey">
                    <tbody>
                      <tr>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[0][0]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[0][1]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[0][2]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[0][3]}"></td>
                      </tr>
                      <tr>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[1][0]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[1][1]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[1][2]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridPreview[1][3]}"></td>
                      </tr>
                    </tbody>
                </v-simple-table>
                <br/>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Hold</v-toolbar-title>
                </v-toolbar>
                <br/>
                <v-simple-table :dense="dense" :key="componentKey">
                    <tbody>
                      <tr>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[0][0]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[0][1]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[0][2]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[0][3]}"></td>
                      </tr>
                      <tr>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[1][0]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[1][1]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[1][2]}"></td>
                        <td style="text-align: center;" :class="{blocks: this.gridHold[1][3]}"></td>
                      </tr>
                    </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col v-if="endgame" cols="12" sm="16" md="7">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>MultiTetris</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p v-if="loss">You lost! You reached the score of {{this.points}}, cleared {{this.rowsRemoved}} lines and reached level {{this.level}}.</p>
                <p v-if="!loss">You won! You reached the score of {{this.points}}, cleared {{this.rowsRemoved}} lines and reached level {{this.level}}.</p>
             </v-card-text> 
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
/*

  import vuetify from '@/plugins/vuetify'
  import Vue from 'vue'
  */

export default {
  components: {
    Keypress: () => import('vue-keypress')
  },
  props: {
    source: String,
  },
  data() {
    return {
      //menus
      show1: false,
      componentKey: 0,
      dense: true,

      login: true,
      game: false,
      endgame: false,

      leaderboard: false,
      passwordTyped: '',

      //grids
      gridPreview:[
        [false, false, false, false],
        [false, false, false, false]
      ],
      gridHold: [
        [false, false, false, false],
        [false, false, false, false]
      ],
      grid: [
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
      ],
      //tetrisblocks
      objectType: '',
      objectRotation: 0,
      holdObjectType:'',
      previewObjectType: '',
      x: 0,
      y: 0,
      justChangedHold: false,
      canHardDrop: true,
      //tetrishelper
      intervalID: 0,
      leaderboardIntervalID: 0,
      level: 1,
      points: 0,
      rowsRemoved: 0,
      loss: false,
      attackPoints: 0,
      attackedPoints: 0,
      gamestart: false,
      target: 'random',
      allowMove: true,
      blockcounter: 0,
      //player or players, information
      name: '',
      userID: 0,
      users: [],
      gameInfo: [],
      usersAlive: [],
      leaderboardInfo: [],
      discovered: false,
      holdhappened: false,
      oldrandom: 0,
      started: false,
      singleplayer: true,
      leaderboardWinner: 0,
      leaderboardLoser: 0,
    }
  },
  async created(){
    this.intervalID = setInterval(() => {this.autoMoveDown()}, 1000);
  },
  methods: {
    
    async changeToLeaderBoard(){
      this.leaderboardIntervalID = await setInterval(() => {this.leaderboardUpdate()}, 1000);
      this.login = false;
      this.leaderboard = true;
    },

    async startgame(){
      if(this.passwordTyped == "gibbiX12345"){
        let getgamestarter = await await axios.get('api/gamestarter')
        this.started = getgamestarter.data[0].gamestarter
        if(this.started == 0){
          await axios.put('/api/game/1', {"best_id": null, "kill_id": null, "game_is_running": 1});
          await axios.put(`/api/gamestarter/1`, {"gamestart": 1});
          this.started = true;
        } else {
          await axios.put(`/api/gamestarter/1`, {"gamestart": 0});
          this.started = false;
        }
      }
    },

    async endround(){
      await axios.put('/api/game/1', {"game_is_running": 0});
    },

    async loadUsers(){
      let getusers = await axios.get('/api/user');
      this.users = getusers.data;
      let getusersAlive = await axios.get('/api/user_alive');
      this.usersAlive = getusersAlive.data;
      await this.singleplayerChecker();
    },
    async singleplayerChecker(){
      if((this.usersAlive.length==1)&&(!this.singleplayer)){
        await this.endscreen();
      }
      if((this.usersAlive.length==1)&&(this.users.length==1)&&(!this.singleplayer)){
        await this.endscreen();
      }
      if((this.users.length<=1)&&(this.usersAlive.length<=1)&&(this.singleplayer)){
        this.singleplayer = true;
      } 
      if((this.users.length>1)&&(this.singleplayer)){
        this.singleplayer = false;
      }
    },

    async loadGame(){
      let game = await axios.get('/api/game/');
      this.gameInfo = game.data[0];
    },

    async bestPlayer(){
      let getbestPlayer = await axios.get('/api/bestPlayer');
      return getbestPlayer.data
    },
    async attacker(){
      let getattacker = await axios.get(`/api/attacker/${this.userID}`);
      return getattacker.data;
    },
    async kill(){
      let getkill = await axios.get(`/api/kill`)
      return getkill.data;
    },

    async leaderboardUpdate(){
      let getleaderboardInfo = await axios.get('/api/leaderboardwinner');
      this.leaderboardInfo = getleaderboardInfo.data;
    },

    attackTarget(type){
      switch(type){
        case 'random': this.target = 'random'; break;
        case 'best': this.target = 'best'; break;
        case 'attacker': this.target = 'attacker'; break;
        case 'kill': this.target = 'kill'; break;
      }
    },

    async attacked(){
      let getattackedPoints = await axios.get(`/api/attacked/${this.userID}`);
      this.attackedPoints = getattackedPoints.data[0].attacked;
      if(this.attackedPoints>=4){
        await this.pushNewRow();
        await this.pushNewRow();
        this.attackedPoints = this.attackedPoints - 4;
      }
      await axios.put(`/api/user/${this.userID}`, {"attacked": this.attackedPoints})
    },

    async attack(){
      if(this.attackPoints>=4){
        var attackenemy = 0
        switch(this.target){
          case 'random':
            var randomInArray = Math.floor(Math.random() * this.usersAlive.length)
            var random = this.usersAlive[randomInArray];
            while(random.iduser == this.userID){
              randomInArray = Math.floor(Math.random() * this.usersAlive.length)
              random = this.usersAlive[randomInArray];
            }
            attackenemy = await axios.get(`api/enemyattacked/${random.iduser}`);
            attackenemy = attackenemy.data[0].attacked + this.attackPoints
            await axios.put(`/api/user/${random.iduser}`, {"attacked": attackenemy, "attacker_id": this.userID});
          break;

          case 'best':
            var best = await this.bestPlayer()
            best = best[0].best_id;
            if((best == null)||(best == this.userID)){
              this.target = 'random';
            } else {
              attackenemy = await axios.get(`api/enemyattacked/${best}`);
              attackenemy = attackenemy.data[0].attacked + this.attackPoints
              await axios.put(`/api/user/${best}`, {"attacked": attackenemy, "attacker_id": this.userID});
            }
          break;

          case 'attacker': 
            var attacker = await this.attacker();
            attacker = attacker[0].attacker_id;
            if(attacker == null){
              this.target = 'random';
            } else {
              attackenemy = await axios.get(`api/enemyattacked/${attacker}`);
              attackenemy = attackenemy.data[0].attacked + this.attackPoints
              await axios.put(`/api/user/${attacker}`, {"attacked": attackenemy, "attacker_id": this.userID});
            }
          break;

          case 'kill': 
            var kill = await this.kill();
            kill = kill[0].kill_id;
            if((kill == null)||(kill == this.userID)){
              this.target = 'random';
            } else {
              attackenemy = await axios.get(`api/enemyattacked/${kill}`);
              attackenemy = attackenemy.data[0].attacked + this.attackPoints
              await axios.put(`/api/user/${kill}`, {"attacked": attackenemy, "attacker_id": this.userID});
            }
          break;
        }
        this.attackPoints = this.attackPoints - 4;
        if(this.attackPoints < 0){
          this.attackPoints = 0;
        }
      }
    },

    async changeToGame(){
      var getgamestart = await axios.get('/api/gamestarter');
      this.gamestart = getgamestart.data[0].gamestarter;
      if(this.gamestart){
        await this.userChecker();
        this.login = false;
        this.game = true;
        this.y = 2;
        await this.createNext();
        await this.addNewRandomIso();
      }
    },

    async userChecker(){
      await this.loadUsers();
      for (var i = 0; i < this.users.length; i++){
        if (this.name == this.users[i].name){
          await axios.put(`/api/user/${i}`, {"name": this.name, "level": 1, "points": 0, "attacked": 0, "alive": 1});
          await this.loadUsers();
          let getiduser = await axios.get(`/api/user/${this.name}`);
          this.userID = getiduser.data[0].iduser
          this.discovered = true;
          await axios.put(`/api/user/${this.userID}`, {"alive": 1});
        }
      }
      if(this.discovered==false){
        await this.loadUsers();
        await axios.post(`/api/user`, {"name": this.name});
        await this.loadUsers();
        let getiduser = await axios.get(`/api/user/${this.name}`);
        this.userID = getiduser.data[0].iduser
      }
    },

    changeToLeaderboard(){
      this.login = false;
      this.changeToLeaderboard = true;
    },


    levelupdater(){
      if((this.rowsRemoved)>(((this.level * 10) + 10))){
        this.level = this.level + 1;
      }
    },


    async softDrop(){
      var oldy = this.y
      await this.moveDown();
      if(this.y != oldy){
        this.points = this.points + 20;
      }
    },

    async hardDrop(){
      if(this.canHardDrop){
        var count = 0;
        var dropable = true;
        if(dropable){
          for (this.y; this.y<=23;){
            count = count + 1;
            let oldy = this.y
            await this.moveDown();
            if(oldy == this.y){
              dropable = false;
              break;
            }
          }
        }
        let countToPoints = 40 * count;
        this.points = this.points + countToPoints;
      }
      this.canHardDrop = false;
    },

    forceRerender() {
      this.componentKey += 1;
      this.componentKey = 0;
    },

    clear(){
      this.grid = [
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
        [false, false, false, false, false, false, false, false, false, false,],
      ]
    },

    clearPreview(){
      this.gridPreview = [[false, false, false, false], [false, false, false, false]]
    },

    createNext(){
      if(this.previewObjectType == ''){
        this.previewObjectType = this.randomBlocks();
        this.drawNext(true);
      }
    },

    drawNext(draw){
      switch(this.previewObjectType){
        case 'T': this.gridPreview[0][1]=draw; this.gridPreview[1][0]=draw; this.gridPreview[1][1]=draw; this.gridPreview[1][2]=draw;
        break;
        case 'Square': this.gridPreview[0][1]=draw; this.gridPreview[0][2]=draw; this.gridPreview[1][1]=draw; this.gridPreview[1][2]=draw;
        break;
        case 'Stick': this.gridPreview[1][0]=draw; this.gridPreview[1][1]=draw; this.gridPreview[1][2]=draw; this.gridPreview[1][3]=draw;
        break;
        case 'L': this.gridPreview[1][0]=draw; this.gridPreview[1][1]=draw; this.gridPreview[1][2]=draw; this.gridPreview[0][2]=draw;
        break;
        case 'Mirrored L': this.gridPreview[1][0]=draw; this.gridPreview[1][1]=draw; this.gridPreview[1][2]=draw; this.gridPreview[0][0]=draw;
        break;
        case 'Dog': this.gridPreview[0][0]=draw; this.gridPreview[0][1]=draw; this.gridPreview[1][1]=draw; this.gridPreview[1][2]=draw;
        break;
        case 'Mirrored Dog': this.gridPreview[0][1]=draw; this.gridPreview[0][2]=draw; this.gridPreview[1][0]=draw; this.gridPreview[1][1]=draw;
        break;
      }
      this.forceRerender();
    },

    async useHold(){
      if(this.justChangedHold==false){
        await this.drawObject(false);
        await this.drawHold(false);
        this.x=4; this.y=1;
        this.objectRotation = 0;
        var intoHold = this.objectType;
        var outHold = this.holdObjectType;
        if(outHold==''){
          this.holdObjectType = intoHold;
          this.objectType = this.previewObjectType;
          await this.drawNext(false);
          this.previewObjectType = this.randomBlocks();
          await this.drawNext(true);
          this.holdhappened = true;
          await this.useHoldHelper();
        } else {
          this.holdObjectType = intoHold;
          this.objectType = outHold;
        }
        await this.drawObject(true);
        await this.drawHold(true);
      }
      this.justChangedHold = true;
    },
    async useHoldHelper(){
      await this.addNewRandomIso();
      this.holdhappened = false;
    },

    drawHold(draw){
      switch(this.holdObjectType){
        case 'T': this.gridHold[0][1]=draw; this.gridHold[1][0]=draw; this.gridHold[1][1]=draw; this.gridHold[1][2]=draw;
        break;
        case 'Square': this.gridHold[0][1]=draw; this.gridHold[0][2]=draw; this.gridHold[1][1]=draw; this.gridHold[1][2]=draw;
        break;
        case 'Stick': this.gridHold[1][0]=draw; this.gridHold[1][1]=draw; this.gridHold[1][2]=draw; this.gridHold[1][3]=draw;
        break;
        case 'L': this.gridHold[1][0]=draw; this.gridHold[1][1]=draw; this.gridHold[1][2]=draw; this.gridHold[0][2]=draw;
        break;
        case 'Mirrored L': this.gridHold[1][0]=draw; this.gridHold[1][1]=draw; this.gridHold[1][2]=draw; this.gridHold[0][0]=draw;
        break;
        case 'Dog': this.gridHold[0][0]=draw; this.gridHold[0][1]=draw; this.gridHold[1][1]=draw; this.gridHold[1][2]=draw;
        break;
        case 'Mirrored Dog': this.gridHold[0][1]=draw; this.gridHold[0][2]=draw; this.gridHold[1][0]=draw; this.gridHold[1][1]=draw;
        break;
      }
      this.forceRerender();
    },

    randomBlocks(){
      var random = Math.floor(Math.random() * 7);
      switch(random){
        case 0: return 'T';
        case 1: return 'Square';
        case 2: return 'Stick';
        case 3: return 'L';
        case 4: return 'Mirrored L';
        case 5: return 'Dog';
        case 6: return 'Mirrored Dog';
      }
    },

    async leaderboardEntry(){
      await axios.put(`/api/user/${this.userID}`, {"points": this.points, "level": this.level});
      var getWinner = await axios.get('/api/leaderboardwinner');
      var getLooser = await axios.get('/api/leaderboardloser');
      if((this.gameInfo.best_id==null)||(this.gameInfo.kill_id==null)){
        await axios.put(`/api/game/1`, {"best_id": this.userID});
        await axios.put(`/api/game/1`, {"kill_id": this.userID});
      }
      if(this.userID == getWinner.data[0].iduser){
        await axios.put(`/api/game/1`, {"best_id": this.userID});
      }
      if(this.userID == getLooser.data[0].iduser){
        await axios.put(`/api/game/1`, {"kill_id": this.userID});
      }
    },

    async addNewRandomIso(){
      if(this.blockcounter>0){
        await this.lossCheck();
      }
      await this.loadUsers();
      await this.loadGame();
      if(this.gameInfo.game_is_running){
        if((!this.holdhappened)&&(!this.singleplayer)){
          await this.leaderboardEntry();
          await this.attacked();
          await this.attack();
        }
        await this.levelupdater();
        this.canHardDrop = true;
        this.justChangedHold = false;
        await this.checkFullRow();
        if(this.y>=2){
          this.blockcounter=this.blockcounter+1;
          var precreatedBlock = this.previewObjectType;
          await this.createIso(precreatedBlock);
          this.previewObjectType = '';
          await this.clearPreview();
          await this.createNext();
        }
      }
    },

    async createIso(isoType){
      switch(isoType){
        case 'T': 
          this.objectType = 'T';
        break;
        case 'Square':
          this.objectType = 'Square';
        break;
        case 'Stick':
          this.objectType = 'Stick';
        break;
        case 'L':
          this.objectType = 'L';
        break;
        case 'Mirrored L':
          this.objectType = 'Mirrored L';
        break;
        case 'Dog':
          this.objectType = 'Dog';
        break;
        case 'Mirrored Dog':
          this.objectType = 'Mirrored Dog';
        break;
      }
      this.x=4; this.y=1;
      this.objectRotation = 0;
      await this.drawObject(true);
    },

    drawObject(draw){
      switch(this.objectType) {
        case 'T': 
          switch(this.objectRotation){
            case 0: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw;
            break;
            case 90: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y][this.x+1]=draw;
            break;
            case 180: this.grid[this.y][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw;
            break;
            case 270: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y][this.x-1]=draw;
            break;
          }
        break;
        case 'Square': 
          this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y-1][this.x+1]=draw;
        break;
        case 'Stick': 
          switch(this.objectRotation){
            case 0:
            case 180:
              this.grid[this.y][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y][this.x+2] = draw;
            break;
            case 90:
            case 270: 
              this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y+2][this.x] = draw;
            break;
          }
        break;
        case 'L': 
          switch(this.objectRotation){
            case 0: this.grid[this.y][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y-1][this.x+1] = draw;
            break;
            case 90: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y+1][this.x+1] = draw;
            break;
            case 180: this.grid[this.y][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y+1][this.x-1] = draw;
            break;
            case 270: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y-1][this.x-1] = draw;
            break;
          }
        break;
        case 'Mirrored L': 
          switch(this.objectRotation){
            case 0: this.grid[this.y][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y-1][this.x-1] = draw; 
            break;
            case 90: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y-1][this.x+1] = draw;
            break;
            case 180: this.grid[this.y][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y+1][this.x+1] = draw;
            break;
            case 270: this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y+1][this.x-1] = draw;
            break;
          }
        break;
        case 'Dog': 
          switch(this.objectRotation){
            case 0: 
            case 180:
              this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y-1][this.x-1] = draw;
            break;
            case 90:
            case 270:
              this.grid[this.y][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y][this.x+1]=draw; this.grid[this.y-1][this.x+1] = draw;
            break;
          }
        break;
        case 'Mirrored Dog': 
          switch(this.objectRotation){
            case 0:
            case 180:
              this.grid[this.y][this.x]=draw; this.grid[this.y-1][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y-1][this.x+1] = draw;
            break;
            case 90:
            case 270: 
              this.grid[this.y][this.x]=draw; this.grid[this.y+1][this.x]=draw; this.grid[this.y][this.x-1]=draw; this.grid[this.y-1][this.x-1] = draw;
            break;
          }
        break;
      }
      this.forceRerender();
    },

    
    async checkRotate(){
      switch(this.objectType){
        case 'T':
          switch(this.objectRotation){
            case 0:
              if(this.y>=23){
                let oldy = this.y;
                await this.moveUp();
                if(oldy==this.y){
                  return false
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x]){
                let oldy = this.y;
                await this.moveUp();
                if(oldy==this.y){
                  return false
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 90:
              if(this.x<=0){
                let oldx = this.x;
                await this.moveRight();
                if(oldx==this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx==this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 180:
              if(this.grid[this.y-1][this.x]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.x>=9){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx==this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx==this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
          }
        break;
        case 'Stick':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.y>=23){
                let oldy = this.y
                await this.moveUp();
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x]){
                let oldy = this.y
                await this.moveUp();
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x-1]){
                let oldy = this.y
                await this.moveUp();
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x+1]){
                let oldy = this.y
                await this.moveUp();
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x+2]){
                let oldy = this.y
                await this.moveUp();
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }               
              } else {
                return true;
              }
            case 90:
            case 270:
              if((this.x>=8)&&((this.x<9))){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.x>=9){
                let oldx = this.x;
                await this.moveLeft();
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if((this.x>=0)&&(this.x<1)){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+2]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
          }
        break;
        case 'L':
          switch(this.objectRotation){
            case 0:
              if(this.y>=23){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x-1]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x+1]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 90:
              if(this.x<=0){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 180:
              if(this.grid[this.y+1][this.x]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x]){
                let oldx = this.x;
                await this.moveLeft();
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x-1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 270:
              if(this.x>=9){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored L':
          switch(this.objectRotation){
            case 0:
              if(this.y>=23){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else if(this.grid[this.y-1][this.x]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else if(this.grid[this.y+1][this.x]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 90:
              if(this.x<=0){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y+1][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 180:
              if(this.grid[this.y-1][this.x]){
                let oldy = this.y
                await this.moveDown();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else if(this.grid[this.y+1][this.x]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else if(this.grid[this.y+1][this.x-1]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else {
                return true;
              }
            case 270:
              if(this.x>=9){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
          }
        break;
        case 'Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.grid[this.y+1][this.x]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else if(this.grid[this.y-1][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x<=0){
                let oldx = this.x
                await this.moveRight();
                if (oldx==this.x){
                  return false
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x]){
                let oldx = this.x;
                await this.moveRight();
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.grid[this.y+1][this.x]){
                let oldy = this.y
                await this.moveUp();
                if(oldy==this.y){
                  return false;
                } else {
                  return true;
                } 
              } else if(this.grid[this.y-1][this.x-1]){
                let oldx = this.x;
                await this.moveRight();
                if(oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x>=9){
                let oldx = this.x;
                await this.moveLeft();
                if (oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x]){
                let oldx = this.x;
                await this.moveLeft();
                await this.moveLeft();
                if (oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else if(this.grid[this.y-1][this.x+1]){
                let oldx = this.x;
                await this.moveLeft();
                if (oldx == this.x){
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
          }
      }
    },

    async rotate(){
      if(!this.loss){
        if(this.y > 1){
          var canMove = await this.checkRotate();
            if ((canMove)&&(this.objectType!='Square')){
            this.drawObject(false);
            switch(this.objectRotation){
              case 0: this.objectRotation=90; break;
              case 90: this.objectRotation=180; break;
              case 180: this.objectRotation=270; break;
              case 270: this.objectRotation=0; break;
            }
            this.drawObject(true);
          }
        }
      }
    },

    checkMoveRight(){
      switch(this.objectType){
        case 'T':
          switch(this.objectRotation){
            case 0:
              if(this.x>=8){
                return false;
              } else if (this.grid[this.y][this.x+2]){
                return false;
              } else if (this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true
              }
            case 270:
              if(this.x>=9){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Square':
          if(this.x>=8){
            return false;
          } else if(this.grid[this.y][this.x+2]){
            return false;
          } else if(this.grid[this.y-1][this.x+2]){
            return false;
          } else {
            return true;
          }
        case 'Stick':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.x>=7){
                return false;
              } else if(this.grid[this.y][this.x+3]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x>=9){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else if(this.grid[this.y+2][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'L':
          switch(this.objectRotation){
            case 0:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y-1][this.x+2]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x+2]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.x>=9){
                return false;
              } else if (this.grid[this.y-1][this.x+1]){
                return false;
              } else if (this.grid[this.y][this.x+1]){
                return false;
              } else if (this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored L':
          switch(this.objectRotation){
            case 0:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y-1][this.x]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.x>=8){
                return false;
              } else if (this.grid[this.y-1][this.x+2]){
                return false;
              } else if (this.grid[this.y][this.x+1]){
                return false;
              } else if (this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y+1][this.x+2]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.x>=9){
                return false;
              } else if (this.grid[this.y-1][this.x+1]){
                return false;
              } else if (this.grid[this.y][this.x+1]){
                return false;
              } else if (this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+2]){
                return false;
              } else if(this.grid[this.y-1][this.x+2]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.x>=8){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else if(this.grid[this.y-1][this.x+2]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x>=9){
                return false;
              } else if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
      }
    },

    async moveRight(){
      if((!this.loss)&&(this.allowMove)){
        var canMove = await this.checkMoveRight();
        if(canMove){
          this.drawObject(false);
          this.x=this.x+1;
          this.drawObject(true);
        }
      }
    },

    checkMoveLeft(){
      switch(this.objectType){
        case 'T':
          switch(this.objectRotation){
            case 0:
              if(this.x<=1){
                return false;
              } else if (this.grid[this.y][this.x-2]){
                return false;
              } else if (this.grid[this.y-1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.x<=0){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true
              }
            case 270:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Square':
          if(this.x<=0){
            return false;
          } else if(this.grid[this.y][this.x-1]){
            return false;
          } else if(this.grid[this.y-1][this.x-1]){
            return false;
          } else {
            return true;
          }
        case 'Stick':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x<=0){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y+2][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'L':
          switch(this.objectRotation){
            case 0:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y-1][this.x]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.x<=0){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y+1][this.x-2]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.x<=1){
                return false;
              } else if (this.grid[this.y-1][this.x-2]){
                return false;
              } else if (this.grid[this.y][this.x-1]){
                return false;
              } else if (this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored L':
          switch(this.objectRotation){
            case 0:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y-1][this.x-2]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.x<=0){
                return false;
              } else if (this.grid[this.y-1][this.x-1]){
                return false;
              } else if (this.grid[this.y][this.x-1]){
                return false;
              } else if (this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.x<=1){
                return false;
              } else if (this.grid[this.y-1][this.x-1]){
                return false;
              } else if (this.grid[this.y][this.x-1]){
                return false;
              } else if (this.grid[this.y+1][this.x-2]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x-2]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x<=0){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.x<=1){
                return false;
              } else if(this.grid[this.y-1][this.x-2]){
                return false;
              } else if(this.grid[this.y][this.x-2]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
      }
    },

    async moveLeft(){
      if((!this.loss)&&(this.allowMove)){
        var canMove = await this.checkMoveLeft();
        if(canMove){
          this.drawObject(false);
          this.x=this.x-1;
          this.drawObject(true);
        }
      }
    },

    checkMoveDown(){
      switch(this.objectType){
        case 'T':
          switch(this.objectRotation){
            case 0:
              if(this.y>=23){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Square':
          if(this.y>=23){
            return false;
          } else if(this.grid[this.y+1][this.x]){
            return false;
          } else if(this.grid[this.y+1][this.x+1]){
            return false;
          } else {
            return true;
          }
        case 'Stick':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.y>=23){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else if(this.grid[this.y+1][this.x+2]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.y>=21){
                return false;
              } else if(this.grid[this.y+3][this.x]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'L':
          switch(this.objectRotation){
            case 0:
              if(this.y>=23){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y+2][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.y>=22){
                return false;
              } else if (this.grid[this.y+2][this.x-1]){
                return false;
              } else if (this.grid[this.y+1][this.x]){
                return false;
              } else if (this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.y>=22){
                return false;
              } else if (this.grid[this.y+2][this.x]){
                return false;
              } else if (this.grid[this.y][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored L':
          switch(this.objectRotation){
            case 0:
              if(this.y>=23){
                return false;
              } else if (this.grid[this.y+1][this.x-1]){
                return false;
              } else if (this.grid[this.y+1][this.x]){
                return false;
              } else if (this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.y>=22){
                return false;
              } else if (this.grid[this.y+1][this.x-1]){
                return false;
              } else if (this.grid[this.y+1][this.x]){
                return false;
              } else if (this.grid[this.y+2][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x-1]){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.y>=23){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.y>=23){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else if(this.grid[this.y+1][this.x]){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.y>=22){
                return false;
              } else if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y+1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
      }
    },

    async moveDown(){
      var canMove = await this.checkMoveDown();
      if(canMove){
        this.drawObject(false);
        this.y=this.y+1;
        this.drawObject(true);
      }
    },

    async autoMoveDown(){
      clearInterval(this.intervalID);
      if((!this.loss)){
        this.allowMove = false;
        switch(this.objectType){
          case 'T': switch(this.objectRotation){
            case 0: 
              if(this.y==23){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 90: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+2][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 180: 
              if (this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+2][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 270: 
              if (this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+2][this.x])||(this.y==22)){
                await this.addNewRandomIso();
              }
            break;
          }
          break;
          case 'Square':
            if(this.y==23){
              await this.addNewRandomIso();
            } else if((this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])||(this.y==23)){
              await this.addNewRandomIso();
            }
          break;
          case 'Stick': switch(this.objectRotation){
            case 0:
            case 180: 
              if(this.y==23){
                await this.addNewRandomIso();
              } else if ((this.grid[this.y+1][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])||(this.grid[this.y+1][this.x+2])){
                await this.addNewRandomIso();
              }
            break;
            case 90:
            case 270: 
              if(this.y==21){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+3][this.x])){
                await this.addNewRandomIso();
              }
            break;
          }
          break;
          case 'L': switch(this.objectRotation){
            case 0: 
              if(this.y==23){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 90: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+2][this.x])||(this.grid[this.y+2][this.x+1])||(this.y==22)){
                await this.addNewRandomIso();
              }
            break;
            case 180: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+2][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 270: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y][this.x-1])||(this.grid[this.y+2][this.x])){
                await this.addNewRandomIso();
              }
            break;
          }
          break;
          case 'Mirrored L': switch(this.objectRotation){
            case 0: 
              if(this.y==23){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 90: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+2][this.x])||(this.grid[this.y][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 180: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+2][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 270:
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+2][this.x-1])||(this.grid[this.y+2][this.x])){
                await this.addNewRandomIso();
              }
            break;
          }
          break;
          case 'Dog': switch(this.objectRotation){
            case 0: 
            case 180: 
              if(this.y==23){
                await this.addNewRandomIso();
              } else if((this.grid[this.y][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 90:
            case 270:
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+2][this.x])||(this.grid[this.y+1][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
          }
          break;
          case 'Mirrored Dog': switch(this.objectRotation){
            case 0:
            case 180: 
              if(this.y==23){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+1][this.x])||(this.grid[this.y][this.x+1])){
                await this.addNewRandomIso();
              }
            break;
            case 90:
            case 270: 
              if(this.y==22){
                await this.addNewRandomIso();
              } else if((this.grid[this.y+1][this.x-1])||(this.grid[this.y+2][this.x])){
                await this.addNewRandomIso();
              }
            break;
          }
          break;
        }
      this.allowMove = true;
      await this.moveDown();
      this.intervalID = setInterval(() => {this.autoMoveDown()}, Math.floor(((1400/this.level)+100)) );
      }
    },

    checkMoveUp(){
      switch(this.objectType){
        case 'T':
          switch(this.objectRotation){
            case 0:
              if(this.grid[this.y-1][this.x-1]){
                return false;
              } else if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.grid[this.y+2][this.x]){
                return false;
              } else if(this.grid[this.y-1][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Square':
          if(this.grid[this.y+2][this.x]){
            return false;
          } else if(this.grid[this.y+2][this.x+1]){
            return false;
          } else {
            return true;
          }
        case 'Stick':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.grid[this.y-1][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else if(this.grid[this.y-1][this.x+2]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.grid[this.y-2][this.x]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'L':
          switch(this.objectRotation){
            case 0:
              if(this.grid[this.y-1][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y-2][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if (this.grid[this.y-1][this.x-1]){
                return false;
              } else if (this.grid[this.y-1][this.x]){
                return false;
              } else if (this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 270:
              if (this.grid[this.y-2][this.x]){
                return false;
              } else if (this.grid[this.y-2][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored L':
          switch(this.objectRotation){
            case 0:
              if (this.grid[this.y-2][this.x-1]){
                return false;
              } else if (this.grid[this.y-1][this.x]){
                return false;
              } else if (this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
              if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y-2][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 180:
              if (this.grid[this.y-1][this.x-1]){
                return false;
              } else if (this.grid[this.y-1][this.x]){
                return false;
              } else if (this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 270:
              if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y-2][this.x-1]){
                return false;
              } else if(this.grid[this.y-1][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y-2][this.x+1]){
                return false;
              } else {
                return true;
              }
          }
        break;
        case 'Mirrored Dog':
          switch(this.objectRotation){
            case 0:
            case 180:
              if(this.grid[this.y-1][this.x-1]){
                return false;
              } else if(this.grid[this.y-2][this.x]){
                return false;
              } else if(this.grid[this.y-2][this.x+1]){
                return false;
              } else {
                return true;
              }
            case 90:
            case 270:
              if(this.grid[this.y-1][this.x]){
                return false;
              } else if(this.grid[this.y-2][this.x-1]){
                return false;
              } else {
                return true;
              }
          }
      }
    },

    async moveUp(){
      var canMove = await this.checkMoveUp();
      if(canMove){
        this.drawObject(false);
        this.y=this.y-1;
        this.drawObject(true);
      }
    },

    async checkFullRow(){
      var rowCounter = 0;
      var rowCounterToPoints = 0;
      for (var i=0; i<=23; i++){
        if ((this.grid[i][0])&&(this.grid[i][1])&&(this.grid[i][2])&&(this.grid[i][3])&&(this.grid[i][4])&&(this.grid[i][5])&&(this.grid[i][6])&&(this.grid[i][7])&&(this.grid[i][8])&&(this.grid[i][9])){
          this.grid.splice(i, 1)
          this.grid.unshift([false, false, false, false, false, false, false, false, false, false,])
          rowCounter = rowCounter + 1;
        }
      }
      switch(rowCounter){
        case 1: 
          rowCounterToPoints = 100 * this.level;
          this.attackPoints = this.attackPoints + 1;
        break;
        case 2:
          rowCounterToPoints = 300 * this.level;
          this.attackPoints = this.attackPoints + 2;
        break;
        case 3: 
          rowCounterToPoints = 500 * this.level;
          this.attackPoints = this.attackPoints + 3;
        break;
        case 4:
          rowCounterToPoints = 800 * this.level;
          this.attackPoints = this.attackPoints + 4;
      }
      this.points = this.points + rowCounterToPoints;
      this.rowsRemoved = this.rowsRemoved + rowCounter;
    },

    async lossCheck(){
      if ((this.grid[1][0]==true)||(this.grid[1][1]==true)||(this.grid[1][0]==true)||(this.grid[1][2]==true)||(this.grid[1][3]==true)||(this.grid[1][4]==true)||(this.grid[1][5]==true)||(this.grid[1][6]==true)||(this.grid[1][7]==true)||(this.grid[1][8]==true)||(this.grid[1][9]==true)){
        await axios.put(`/api/user/${this.userID}`, {"alive": 0});
        this.loss = true;
        await this.endscreen();         
      }
    },

    pushNewRow(){
      if (!this.loss){
        this.grid.splice(0, 1);
        var randomPush = Math.floor(Math.random() * 10);
        switch(randomPush){
          case 0: this.grid.push([false, true, true, true, true, true, true, true, true, true,])
            break;
          case 1: this.grid.push([true, false, true, true, true, true, true, true, true, true,])
            break;
          case 2: this.grid.push([true, true, false, true, true, true, true, true, true, true,])
            break;
          case 3: this.grid.push([true, true, true, false, true, true, true, true, true, true,])
            break;
          case 4: this.grid.push([true, true, true, true, false, true, true, true, true, true,])
            break;
          case 5: this.grid.push([true, true, true, true, true, false, true, true, true, true,])
            break;
          case 6: this.grid.push([true, true, true, true, true, true, false, true, true, true,])
            break;
          case 7: this.grid.push([true, true, true, true, true, true, true, false, true, true,])
            break;
          case 8: this.grid.push([true, true, true, true, true, true, true, true, false, true,])
            break;
          case 9: this.grid.push([true, true, true, true, true, true, true, true, true, false,])
            break;
        }
      }
    },

    async endscreen(){
      await this.leaderboardEntry();
      this.game = false;
      this.endgame = true;
    }
  },
  async destroyed(){
    await axios.put(`/api/user/${this.userID}`, {"alive": 0});
    await clearInterval(this.intervalID);
  }  
}

</script>
<style>
th, td{
  width: 24px !important; 
  height: 24px !important;
}
.preview{
  background-color: grey;
}
.blocks {
  background-color:DodgerBlue;
}
</style>