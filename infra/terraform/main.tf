# main.tf
terraform {
  required_version = ">= 1.3"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" { region = var.region }

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.5"

  name = "e2e-vpc"
  cidr = "10.0.0.0/16"

  azs             = slice(data.aws_availability_zones.available.names, 0, 3)
  private_subnets = ["10.0.1.0/24","10.0.2.0/24","10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24","10.0.102.0/24","10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}

data "aws_availability_zones" "available" {}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.24"

  cluster_name    = var.cluster_name         # <= ces deux variables sont valides avec ce module
  cluster_version = var.cluster_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  enable_irsa = true

  eks_managed_node_groups = {
    default = {
      desired_size  = 2
      min_size      = 2
      max_size      = 3
      instance_types = ["t3.medium"]
    }
  }
}

output "cluster_name" { value = module.eks.cluster_name }
