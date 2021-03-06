/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as core from "@actions/core";

export interface Config {
  GITHUB_TOKEN: string;
  SECRETS: string[];
  REPOSITORIES: string[];
  DRY_RUN: boolean;
}

export function getConfig(): Config {
  const config = {
    GITHUB_TOKEN: core.getInput("GITHUB_TOKEN", { required: true }),
    SECRETS: core.getInput("SECRETS", { required: true }).split("\n"),
    REPOSITORIES: core.getInput("REPOSITORIES", { required: true }).split("\n"),
    DRY_RUN: ["1", "true"].includes(
      core.getInput("DRY_RUN", { required: false }).toLowerCase()
    )
  };

  if (config.DRY_RUN) {
    core.info("[DRY_RUN='true'] No changes will be written to secrets");
  }

  return config;
}
