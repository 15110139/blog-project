import {SetMetadata} from "@nestjs/common";
import { ENVIRONMENTS, EnvironmentService } from "../environment/environment.service";

export const KEY_ENVIRONMENT_METADATA = Symbol("env");

export type PublishConfig =  {
	[key in ENVIRONMENTS]?: {
		ipWhitelist: keyof EnvironmentService["ENVIRONMENT"] | "*",
	}
}

export const Publishes = (config: PublishConfig) => SetMetadata(KEY_ENVIRONMENT_METADATA, config);
