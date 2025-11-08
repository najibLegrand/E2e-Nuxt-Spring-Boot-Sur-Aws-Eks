# variables.tf
variable "region"          { type = string }
variable "cluster_name"    { type = string, default = "e2e-eks" }
variable "cluster_version" { type = string, default = "1.29" }
